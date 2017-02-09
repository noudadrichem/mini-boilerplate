'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify')
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function() {
 gulp.src('src/scss/**/*.scss')
   .pipe(sass())
   .pipe(autoprefixer())
   .pipe(gulp.dest('public/assets/css'))
   .pipe(browserSync.reload({stream: true}))
})

gulp.task('json', function() {
  gulp.src('src/data/**/*.json')
    .pipe(gulp.dest('public/assets/data'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('img', function() {
  gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('public/assets/images'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/scss/**/*.scss', ['sass'])
  gulp.watch('./src/js/**/*.js', ['js'])
});

gulp.task('default', ['html','json', 'img', 'sass', 'js', 'server']);
