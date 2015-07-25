var gulp = require('gulp');
var php = require('gulp-connect-php');
var browserSync = require('browser-sync');
var sequence = require('gulp-sequence');
var requireDir = require('require-dir');
var CONFIG = require('./package.json').projectConfig;
var reload = browserSync.reload;

requireDir('./tasks');

gulp.task('php', function() {
    php.server({
      base: CONFIG.DST + CONFIG.PATH,
      port: 8010,
      keepalive: true
    });
});

gulp.task('serve', ['php'], function() {
  var obj = {};
  
  return browserSync({
    proxy: '127.0.0.1:8010',
    open: true,
    notify: false
    // server: {
    //   baseDir: './',
    //   index: CONFIG.DST + CONFIG.PATH + '/index.php',
    //   routes: (
    //     obj['' + CONFIG.PATH] = '' + CONFIG.DST + CONFIG.PATH + '/',
    //     obj
    //   )
    // }
  });
});

gulp.task('start', sequence([
  'sass',
  'browserify'
], 'serve'));

gulp.task('default', ['start'], function() {
  gulp.watch(['./' + CONFIG.DST + '/**/*.php'], [reload]);
  gulp.watch(['./' + CONFIG.SRC + '/**/*.{scss,sass}'], ['sass', reload]);
  gulp.watch(['./' + CONFIG.SRC + '/**/*.js'], ['browserify', reload]);
});
