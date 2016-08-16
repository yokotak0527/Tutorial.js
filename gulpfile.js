"use strict";

const gulp       = require('gulp');
const path       = require('path');
const concat     = require('gulp-concat');
const sass       = require('gulp-sass');
const babel      = require('gulp-babel');
const plumber    = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const pleeease   = require('gulp-pleeease');
const uglify     = require('gulp-uglify');
const rename     = require('gulp-rename');

let concatJSList = [
  'assets/js/core.js',
  'assets/js/events.js'
];
// -----------------------------------------------------------------------------
gulp.task('build:js', ()=>{
  return gulp.src(concatJSList)
    .pipe(plumber())
    .pipe(concat('Tutorial.js'))
    .pipe(babel({
      'minified' : false,
      'comments' : true,
      'presets'  : ['es2015', 'stage-0', 'stage-1', 'stage-2']
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('dest'));
});
// -----------------------------------------------------------------------------
gulp.task('build:sass', ()=>{
  return gulp.src('assets/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({'outputStyle':'compressed'}).on('error', sass.logError))
    .pipe(pleeease({
      'autoprefixer' : {
        'browsers' : ['last 3 versions', 'Android >= 4.2'],
        'cascade'  : false
      },
      'minifier' : true,
      'mqpacker' : true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('dest'));
});
// -----------------------------------------------------------------------------
gulp.task('minify', ()=>{
  return gulp.src('dest/Tutorial.js')
    .pipe(uglify({ 'preserveComments' : 'license' }))
    .pipe(rename('Tutorial.min.js'))
    .pipe(gulp.dest('dest'))
});
// -----------------------------------------------------------------------------
gulp.task('watch', ()=>{
  gulp.watch('assets/sass/**/*.sass', ['build:sass']);
  gulp.watch('assets/js/**/*.js',     ['build:js']);
});
// -----------------------------------------------------------------------------
gulp.task('publish', ['build:js', 'minify', 'build:sass']);
