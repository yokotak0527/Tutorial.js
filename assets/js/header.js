"use strict";

const gulp   = require('gulp');
const path   = require('path');
const concat = require('gulp-concat');

let conf = {
  'cwd'        : process.cwd(),
  'assetsPath' : 'assets',
  'destPath'   : 'dest'
  }
};

let concatJSList = [
  'core.js',
  'event.js',
  'util.js'
]

// =============================================================================
//
// =============================================================================
gulp.task('build:js', ()=>{
  return this;
});

// -----------------------------------------------------------------------------
gulp.task('build:sass', ()=>{
    return this;
});

// -----------------------------------------------------------------------------
gulp.task('test', ()=>{
  return this;
});

// -----------------------------------------------------------------------------
gulp.task('watch', ()=>{
  return this;
});

// -----------------------------------------------------------------------------
gulp.task('default', ()=>{
  return this;
});
