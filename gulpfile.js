var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src('./librato-cli-*')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  gulp.src('./modules/*')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
