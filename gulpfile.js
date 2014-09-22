var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp
        .src(['test/bootstrap.js', 'test/scripts/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});