

const { src, dest, series } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const clean = require('gulp-clean')

function build() {
  return src('src/index.js', { allowEmpty: true })
    .pipe(babel({
      presets: [
        '@babel/env'
      ]
    }))
    .pipe(uglify())
    .pipe(rename('v-axios.min.js'))
    .pipe(dest('dist/'));
}

function copy() {
  return src('src/module.js')
    .pipe(rename('v-axios.esm.js'))
    .pipe(dest('dist/'));
}

function clear() {
  return src('dist/*').pipe(clean({
    force: true
  }));
}

exports.default = series(clear, build, copy)