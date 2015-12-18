const gulp = require('gulp'),
      babel = require('gulp-babel'),
      karmaServer = require('karma').Server,
      eslint = require('gulp-eslint'),
      watch = require('gulp-watch')
      batch = require('gulp-batch'),
      rimraf = require('gulp-rimraf'),
      src = __dirname +'/src/**/*.js',
      test = __dirname + '/test/**/*.spec.js',
      dist = __dirname + '/dist';

gulp.task('lint', function () {
  return gulp.src([src, test])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function () {
    watch([src, test], batch(function (events, done) {
        gulp.start('lint', done);
    }));
});

gulp.task('karma-watch', function (done) {
  new karmaServer.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('karma', function (done) {
  new karmaServer.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('clean', function () {
  return gulp.src(dist + '/**/*', {read: false})
    .pipe(rimraf());
});

gulp.task('babel', ['clean'], function () {
  return gulp.src([src])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest(dist));
});

gulp.task('default', ['lint', 'babel']);
