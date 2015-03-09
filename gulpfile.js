var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    merge = require('merge2'),
    del = require('del');

gulp.task('typescript', function() {
  var tsResult = gulp.src(['src/**/*.ts'])
    .pipe(ts({
      sortOutput: true,
      declarationFiles: true,
      noExternalResolve: true
    }));
    return merge([
        tsResult.dts
          .pipe(concat('Sef.d.ts'))
          .pipe(gulp.dest('build')),
        tsResult.js
          .pipe(concat('Sef.js'))
          .pipe(gulp.dest('build'))
      ]
    );
});

gulp.task('scripts', ['common'], function() {
  return gulp.src(['build/Sef.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('common', ['typescript'], function() {
  return gulp.src([
      'build/Sef.js',
      'common.js'
    ])
    .pipe(concat('Sef.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('definition', ['common'], function() {
  return gulp.src([
      'Sef.common.d.ts'
    ])
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
  return del(['build/*'])
});

gulp.task('default', ['clean'], function() {
    gulp.start('typescript', 'common', 'definition', 'scripts');
});

gulp.task('watch', function() {
  // Watch .ts files
  gulp.watch('src/**/*.ts', ['default']);
});
