const { src, dest, series } = require("gulp");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const uglifyEs = require("gulp-uglify-es").default;

function min(isEsm) {
  const stream = src("src/index.js")
    .pipe(
      babel({
        presets: [
          "@babel/env"
        ],
        plugins: ["@babel/plugin-transform-modules-umd"]
      })
    )

  return output(stream);
}

function esm() {
  const stream = src("src/index.js").pipe(
    babel({
      presets: [["@babel/env", { modules: false }]],
    })
  );

  return output(stream, true);
}

function output(stream, isEsm) {
  return stream
    .pipe(uglifyEs())
    .pipe(rename("v-axios." + (isEsm ? "esm" : "min") + ".js"))
    .pipe(dest("dist/"));
}

function clear() {
  return src("dist/*").pipe(
    clean({
      force: true,
    })
  );
}

exports.default = series(clear, min, esm);