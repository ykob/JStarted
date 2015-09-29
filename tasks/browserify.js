var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var CONFIG = require('../package.json').projectConfig;

var browserifyOpts = {
  entries: ['./' + CONFIG.SRC + '/js/main.js']
};

var bundler = function(watch) {
  var b;

  if (watch) {
    browserifyOpts.debug = true;
    browserifyOpts.cache = {};
    browserifyOpts.packageCache = {};
    browserifyOpts.fullPath = true;
    b = watchify(browserify(browserifyOpts));
  } else {
    b = browserify(browserifyOpts);
  }

  var bundle = function() {
    return b
            .bundle()
            .on('error', function(err) {
              console.log('bundle error: ' + err);
            })
            .pipe(source('main.js'))
            .pipe(gulp.dest('./' + CONFIG.DST + CONFIG.PATH + '/js/'));
  };

  b
    .on('update', bundle);

  return bundle();
};

gulp.task('browserify', function() {
  return bundler();
});

gulp.task('watchify', function() {
  return bundler(true);
});
