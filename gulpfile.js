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
let packageJson  = require('./package.json');
let exec         = require('child_process').exec;

packageJson.name = 'Tutorial.js';

let concatJSList = [
  'assets/js/header.js',
  'assets/js/Tutorial.js',
  'assets/js/TutorialMediator.js',
  'assets/js/CustomEvent.js',
  'assets/js/CustomEventContainer.js',
  'assets/js/Step.js',
  'assets/js/DOMController.js',
  'assets/js/SimpleDeferred.js',
  'assets/js/Animation.js',
  'assets/js/BGCanvas.js',
  'assets/js/config.js',
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

  let target = path.join('dest', packageJson.name);
  let outDir = `./doc/${packageJson.version}`;
  // console.log(outDir);
  //  -c ./jsdoc.json

  exec(`./node_modules/.bin/jsdoc ${target} -c ./jsdoc.json -d ${outDir}`, (error, stdout, stderr)=>{
    if(error !== null) console.error(error);
    // console.log('stdout: ' + stdout);
    // console.log('stderr: ' + stderr);
    // if (error !== null) {
    //     console.log('exec error: ' + error);
    // }
  });
  // ./node_modules/.bin/jsdoc
  // console.log(jsdoc);
  // let infos = {
  //   'name'    : packageJson.name,
  //   'version' : packageJson.version
  // };
  // let tmpl = {
  //   'path' : 'minami',
  //   'systemName' : packageJson.name,
  //   'inverseNav'     : true,
  //   'systemName'     : packageJson.name,
  //   'search'         : false,
  //   'cleverLinks'    : false,
  //   'monospaceLinks' : true
  // };
  // let ops = {
  //   outputSourceFiles: false
  // };

  // let config = {
  //   'tags' : {
  //     'allowUnknownTags' : true
  //   },
  //   'opts': {
  //     'destination' : './doc/' + packageJson.version,
  //     'encoding'    : 'utf8',
  //     // 'template'    : './node_modules/minami'
  //   },
  //   'plugins' : [ 'plugins/markdown' ],
  //   'templates' : {
  //     // 'default' : {
  //     //   'layoutFile' : 'tutorial.tmpl'
  //     // },
  //     'inverseNav'     : true,
  //     'systemName'     : packageJson.name,
  //     'search'         : false,
  //     'cleverLinks'    : false,
  //     'monospaceLinks' : true
  //   },
  //   // 'path' : path.join(process.cwd(),'node_modules/minami'),
  //   'navType'  : 'vertical',
  //   'linenums' : true
  // };
  // gulp.src(path.join('dest', packageJson.name), { raed : false }).pipe(jsdoc(config))
  // gulp.src(path.join('dest', packageJson.name))
  //   .pipe(jsdoc.parser(infos))
  //   .pipe(jsdoc.generator('./doc/' + packageJson.version, tmpl, ops));
});
// -----------------------------------------------------------------------------
gulp.task('watch', ()=>{
  gulp.watch('assets/sass/**/*.sass', ['build:sass']);
  gulp.watch('assets/js/**/*.js',     ['build:js']);
});
// -----------------------------------------------------------------------------
gulp.task('publish', ['build:js', 'jsdoc', 'minify', 'build:sass']);
