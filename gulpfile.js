const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const htmlmin = require('gulp-htmlmin')
const sourcemaps = require('gulp-sourcemaps')
const webpack = require('webpack-stream')
const clean = require('gulp-clean')

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('sass', function() {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('json', function() {
  gulp.src('./src/data/**/*.json')
    .pipe(gulp.dest('./public/assets/data'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('handlebars', function() {
  gulp.src('./src/templates/**/*.handlebars')
    .pipe(gulp.dest('./public/assets/templates'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('img', function() {
  gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('public/assets/images'))
})

gulp.task('babel', function() {
  return gulp.src('./src/js/master.js')
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/scss/**/*.scss', ['sass'])
  gulp.watch('./src/data/*.json', ['json'])
  gulp.watch('./src/templates/*.handlebars', ['handlebars'])
  gulp.watch('./src/js/**/*.js', ['babel'])
})

gulp.task('dev', ['html', 'json', 'handlebars',  'img', 'sass', 'babel', 'server'])
gulp.task('build', ['html', 'json', 'handlebars', 'img', 'sass', 'babel'])
gulp.task('clean', function() {
  return gulp.src('./public', {
      read: false
    })
    .pipe(clean())
})
