var gulp = require('gulp');
var sequence = require('gulp-sequence');
var requireDir = require('require-dir');
var CONFIG = require('./package.json').projectConfig;

requireDir('./tasks');

gulp.task('start', sequence([
  'sass',
  'watchify'
]));

gulp.task('default', ['start'], function() {
  gulp.watch(['./' + CONFIG.SRC + '/**/*.{scss,sass}'], ['sass']);
});
