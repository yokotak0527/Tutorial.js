module.exports = function(config) {
  config.set({
    'basePath'          : '../',
    'frameworks'        : [ 'jasmine' ],
    'files'             : [ 'dest/src/js/jquery-2.2.4.min.js', 'dest/Tutorial.js', 'dest/spec/*.js' ],
    'exclude'           : [],
    'preprocessors'     : { 'dest/spec/*.js' : [ 'babel' ] },
    'babelPreprocessor' : {
      'options' : {
        'presets' : ['es2015']
      }
    },
    'reporters'   : [ 'progress' ],
    'port'        : 9876,
    'colors'      : true,
    'logLevel'    : config.LOG_INFO,
    'autoWatch'   : true,
    'browsers'    : [ 'PhantomJS' ],
    'singleRun'   : false,
    'concurrency' : Infinity
  })
}
