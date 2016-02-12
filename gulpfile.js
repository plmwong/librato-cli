var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

gulp.task('lint', function() {
  gulp.src(['./librato-cli-*', './modules/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', ['lint'], function() {
  gulp.watch(['./librato-cli-*', './modules/*'], ['lint']);
  gutil.log(gutil.colors.bgBlue('Watching for changes to nodejs files...'));
});

gulp.task('default', ['watch']);
