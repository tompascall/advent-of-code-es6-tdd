const gulp = require('gulp'),
      babel = require('gulp-babel'),
      karmaServer = require('karma').Server,
      eslint = require('gulp-eslint'),
      watch = require('gulp-watch')
      batch = require('gulp-batch');

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', 'test/**/*.spec.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function () {
    watch(['src/**/*.js', 'test/**/*.spec.js'], batch(function (events, done) {
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
  
gulp.task('babel', function () {
  return gulp.src(['src/**/*.js', 'test/**/*.spec.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'babel']);
