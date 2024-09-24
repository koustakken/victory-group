const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const server = require('gulp-server-livereload')
const gulpClean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const imageMin = require('gulp-imagemin')
const sassGlob = require('gulp-sass-glob')

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({ title: title, message: 'Error: <%= error.message %>' }),
  }
}

/**
 * Clean
 */

gulp.task('clean:dev', function (cb) {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false }).pipe(gulpClean({ force: true }))
  }
  cb()
})

/**
 * Include files
 */

const fileIncludeOptions = {
  prefix: '@@',
  basepath: '@file',
}

gulp.task('html:dev', function () {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeOptions))
    .pipe(gulp.dest('./build'))
})

/**
 * SASS
 */

gulp.task('sass:dev', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber(plumberNotify('SASS')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css'))
})

/**
 * Images
 */

gulp.task('images:dev', function () {
  return gulp.src('./src/images/**/*').pipe(gulp.dest('./build/images'))
})

/**
 * Fonts
 */

gulp.task('fonts:dev', function () {
  return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./build/fonts'))
})

/**
 * Files
 */

gulp.task('files:dev', function () {
  return gulp.src('./src/files/**/*').pipe(gulp.dest('./build/files'))
})

/**
 * Js
 */

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js'))
})

/**
 * Live Server
 */

const serverOptions = {
  livereload: true,
  open: true,
}

gulp.task('server:dev', function () {
  return gulp.src('./build').pipe(server(serverOptions))
})

/**
 * Watch
 */

gulp.task('watch:dev', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'))
  gulp.watch('./src/**/*.html', gulp.parallel('html:dev'))
  gulp.watch('./src/images/**/*', gulp.parallel('images:dev'))
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'))
  gulp.watch('./src/files/**/*', gulp.parallel('files:dev'))
  gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'))
})
