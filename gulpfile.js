var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    typescript = require('gulp-tsc'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

gulp.task('typescript', function() {
  return gulp.src(['src/**/*.ts'])
    .pipe(typescript({ module: 'commonjs', out: 'Sef.js', declaration: true }))
    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', ['typescript'], function() {
  return gulp.src(['build/Sef.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
  return gulp.src(['build'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('typescript', 'scripts');
});

gulp.task('watch', function() {
  // Watch .ts files
  gulp.watch('src/**/*.ts', ['typescript', 'scripts']);
});
