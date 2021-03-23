/* eslint-disable */
const rollup = require("rollup")
const chalk = require("chalk")
const path = require("path")
const json = require("@rollup/plugin-json")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")
const { default: babel, getBabelOutputPlugin } = require("@rollup/plugin-babel")
const cjs = require("@rollup/plugin-commonjs")
const pkg = require("../package.json")
const { DEFAULT_EXTENSIONS } = require('@babel/core')
const replace = require('@rollup/plugin-replace')
const cleanup = require('rollup-plugin-cleanup')
const rm = require("rimraf");

const deps = Object.keys(Object.assign({}, pkg.dependencies))
const foldPath = path.resolve(__dirname, `..`)
const input = path.resolve(foldPath, "src/index.js")
const outputConfig = {
  esm: {
    format: "esm",
    file: path.resolve(foldPath, `dist/${pkg.name}.esm.js`)
  },
  umd: {
    format: "umd",
    file: path.resolve(foldPath, `dist/${pkg.name}.js`),
    name: "CAxios",
    globals: {
      axios: "Axios"
    },
    exports: "named"
  }
}

const commonExtensions = [".ts", ".tsx", ".vue"]

const runBuild = async () => {
  const outputKeyList = Object.keys(outputConfig)
  let index = 0

  rm(
    path.resolve(__dirname, '../dist'),
    async err => {
      if (err) throw err;

      build(outputKeyList[index])
    }
  );

  async function build(name) {
    if (!name) return

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
        nodeResolve({
          extensions: [".mjs", ".js", ".json", ".node", ...commonExtensions]
        }),
        cjs({
          // 开启混合模式转换
          transformMixedEsModules: true,
          sourceMap: false
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        babel({
          babelHelpers: "runtime",
          extensions: [...DEFAULT_EXTENSIONS, ...commonExtensions]
        }),
        json(),
        cleanup(),
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
        return name === "umd" ? /^axios$/.test(id) : deps.some(k => {
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
