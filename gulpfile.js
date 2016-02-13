var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');

var jshint = require('gulp-jshint');

var jasmine = require('gulp-jasmine');

gulp.task('lint', function() {
  gulp.src(['./librato-cli-*', './modules/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
	return gulp.src('spec/*.js')
		.pipe(jasmine({ verbose: true }));
});

gulp.task('watch', ['lint', 'test'], function() {
  gulp.watch(['./librato-cli-*', './modules/*'], ['lint']);
  gutil.log(gutil.colors.bgBlue('Watching for changes to nodejs files...'));
});

gulp.task('default', ['watch']);
