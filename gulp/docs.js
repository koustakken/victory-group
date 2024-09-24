const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const server = require('gulp-server-livereload')
const gulpClean = require('gulp-clean')
const fs = require('fs')
const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const imageMin = require('gulp-imagemin')
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const htmlClean = require('gulp-htmlclean')
const webp = require('gulp-webp')
const webpCss = require('gulp-webp-css')
const webpHtml = require('gulp-webp-html')

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({ title: title, message: 'Error: <%= error.message %>' }),
  }
}

/**
 * Clean
 */

gulp.task('clean:docs', function (cb) {
  if (fs.existsSync('./docs/')) {
    return gulp.src('./docs/', { read: false }).pipe(gulpClean({ force: true }))
  }
  cb()
})

/**
 * HTML
 */

const fileIncludeOptions = {
  prefix: '@@',
  basepath: '@file',
}

gulp.task('html:docs', function () {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeOptions))
    .pipe(webpHtml())
    .pipe(htmlClean())
    .pipe(gulp.dest('./docs'))
})

/**
 * SASS
 */

gulp.task('sass:docs', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber(plumberNotify('SASS')))
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(sass())
    .pipe(groupMedia())
    .pipe(csso())
    .pipe(gulp.dest('./docs/css'))
})

/**
 * Images
 */

gulp.task('images:docs', function () {
  return gulp
    .src('./src/images/**/*')
    .pipe(webp())
    .pipe(gulp.dest('./docs/images'))
    .pipe(gulp.src('./src/images/**/*'))
    .pipe(imageMin({ verbose: true }))
    .pipe(gulp.dest('./docs/images'))
})

/**
 * Fonts
 */

gulp.task('fonts:docs', function () {
  return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./docs/fonts'))
})

/**
 * Files
 */

gulp.task('files:docs', function () {
  return gulp.src('./src/files/**/*').pipe(gulp.dest('./docs/files'))
})

/**
 * Js
 */

gulp.task('js:docs', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js'))
})

/**
 * Live Server
 */

const serverOptions = {
  livereload: true,
  open: true,
}

gulp.task('server:docs', function () {
  return gulp.src('./docs').pipe(server(serverOptions))
})
