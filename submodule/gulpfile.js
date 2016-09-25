var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
gulp.task('coffee', function() {
  gulp.src('./work/**/*.coffee')
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(coffee())
  .pipe(gulp.dest('./work'));
});
gulp.task('concat', function() {
  var compileFileName = 'submodule.js';
  gulp.src(['./work/**/*.js'])
  .pipe(concat(compileFileName))
  .pipe(gulp.dest('./'))
  .pipe(gulp.dest('../src/resources/js/'))
  //.pipe(gulp.dest('../dist/common/js'));
});
gulp.task('watch', function() {
  watch('./work/**/*.coffee', function() {
    gulp.start(['coffee']);
  });
  watch(['./work/**/*.js'], function() {
    gulp.start(['concat']);
  });
});
gulp.task('uglify', function() {
  return gulp.src('./submodule.js')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(uglify('submodule.min.js'))
});
gulp.task('default', ['watch']);