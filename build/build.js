/* eslint-disable */
const vue = require("rollup-plugin-vue")
const rollup = require("rollup")
const chalk = require("chalk")
const path = require("path")
const json = require("@rollup/plugin-json")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")
const { default: babel, getBabelOutputPlugin } = require("@rollup/plugin-babel")
const cjs = require("@rollup/plugin-commonjs")
const typescript = require("rollup-plugin-typescript2")
const pkg = require("../package.json")
const { DEFAULT_EXTENSIONS } = require('@babel/core')
const replace = require('@rollup/plugin-replace')

const deps = Object.keys(Object.assign({}, pkg.dependencies))
const foldPath = path.resolve(__dirname, `..`)
const input = path.resolve(foldPath, "src/index.ts")
const outputConfig = {
  esm: {
    format: "esm",
    file: path.resolve(foldPath, `dist/${pkg.name}.esm.js`)
  },
  umd: {
    format: "umd",
    file: path.resolve(foldPath, `dist/${pkg.name}.js`),
    name: "CAXIOS",
    globals: {
      vue: "Vue"
    },
    exports: "named"
  }
}

const commonExtensions = [".ts", ".tsx", ".vue"]

const runBuild = async () => {
  const outputKeyList = Object.keys(outputConfig)
  let index = 0

  build(outputKeyList[index])

  async function build(name) {
    if (!name) return
    const extPlugins =
      name === "esm"
        ? []
        : [
            cjs({
              // 开启混合模式转换
              transformMixedEsModules: true,
              sourceMap: false
            })
          ]

    const extTerserOpt =
      name === "esm"
        ? {
            compress: {
              pure_getters: true
            },
            format: {
              comments: false
            },
            ecma: 2015
          }
        : {}
    const outOptions = outputConfig[name]
    const inputOptions = {
      input,
      plugins: [
        typescript(),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        nodeResolve({
          extensions: [".mjs", ".js", ".json", ".node", ...commonExtensions]
        }),
        vue(),
        babel({
          babelHelpers: "runtime",
          extensions: [...DEFAULT_EXTENSIONS, ...commonExtensions]
        }),
        json(),
        ...extPlugins,
        terser(
          Object.assign(
            {
              mangle: false,
              toplevel: true,
              safari10: true
            },
            extTerserOpt
          )
        )
      ],
      external(id) {
        return name === "umd" ? /^vue$/.test(id) : deps.some(k => {
          // if(id.includes('vue') && k !== id && k === 'vue') {
          //   return false
          // }

          return new RegExp("^" + k).test(id)
        })
      }
    }

    console.log(chalk.blue(input + " → " + outOptions.file + "..."))

    try {
      const str = chalk.green("create " + outOptions.file + " done")
      console.time(str)
      const bundle = await rollup.rollup(inputOptions)
      const { output } = await bundle.generate(outOptions)
      await bundle.write(outOptions)
      index++

      console.timeEnd(str)
      if (index < outputKeyList.length) {
        await build(outputKeyList[index])
      }
    } catch (e) {
      console.error(e)
      process.exit
    }
  }
}

runBuild()
