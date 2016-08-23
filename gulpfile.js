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
const jsdoc      = require('gulp-jsdoc');
let packageJson  = require('./package.json');

packageJson.name = 'Tutorial.js';
// console.log(packageJson.version);

let concatJSList = [
  'assets/js/header.js',
  'assets/js/static-private-properties.js',
  'assets/js/static-private-method.adjustStepNum.js',
  'assets/js/static-private-method.eventListenerRelation.js',
  'assets/js/class-start.js',
  'assets/js/static-method.changeConfig.js',
  'assets/js/constructor.js',
  'assets/js/method.addStep.js',
  'assets/js/method.removeStep.js',
  'assets/js/method.changeStep.js',
  'assets/js/method.prev.js',
  'assets/js/method.next.js',
  'assets/js/method.hide.js',
  'assets/js/method.show.js',
  'assets/js/method.addEventListener.js',
  'assets/js/method.removeEventListener.js',
  'assets/js/method.isActive.js',
  'assets/js/method.indexByName.js',
  'assets/js/class-end.js',
  'assets/js/footer.js'
];
// -----------------------------------------------------------------------------
gulp.task('build:js', ()=>{
  return gulp.src(concatJSList)
    .pipe(plumber())
    .pipe(concat(packageJson.name))
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
  return gulp.src(path.join('dest', packageJson.name))
    .pipe(uglify({ 'preserveComments' : 'license' }))
    .pipe(rename('Tutorial.min.js'))
    .pipe(gulp.dest('dest'))
});
// -----------------------------------------------------------------------------
gulp.task('jsdoc', ()=>{
  return gulp.src(path.join('dest', packageJson.name))
    .pipe(jsdoc.parser({
      'name'    : packageJson.name,
      'version' : packageJson.version
    }))
    .pipe(jsdoc.generator( 'doc', null, { 'outputSourceFiles' : false } ))
    // {
      // 'path'       : 'ink-docstrap',
      // 'systemName' : packageJson.name + ' Document',
      // 'copyright'  : packageJson.author,
      // 'theme'      : 'minami'
    // },
});
// -----------------------------------------------------------------------------
gulp.task('watch', ()=>{
  gulp.watch('assets/sass/**/*.sass', ['build:sass']);
  gulp.watch('assets/js/**/*.js',     ['build:js']);
});
// -----------------------------------------------------------------------------
gulp.task('publish', ['build:js', 'jsdoc', 'minify', 'build:sass']);
