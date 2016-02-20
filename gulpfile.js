/* File: gulpfile.js */

var gulp = require('gulp'),
gutil = require('gulp-util'),
jshint = require('gulp-jshint'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
cssnano = require('gulp-cssnano');

gulp.task('default', ['jshint', 'build-js', 'minify-css']);

gulp.task('jshint', function() {
    return gulp.src('public/js/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch('public/js/app/**/*.js', ['jshint']);
});

gulp.task('build-js', function() {
    return gulp.src([
        './public/js/components/angular/angular.min.js',
        './public/js/components/angular-route/angular-route.min.js',
        './public/js/components/angular-resource/angular-resource.min.js',
        './public/js/components/socket.io-client/socket.io.js',
        './public/js/app/app.js',
        './public/js/app/route-config.js',
        './public/js/app/main/main.js',
        './public/js/app/home/home.js',
        './public/js/app/chat/chat.js',
        './public/js/app/services/AuthInterceptor.js',
        './public/js/app/services/AuthToken.js',
        './public/js/app/services/RouteInterceptor.js',
        './public/js/app/services/RequestService.js',
        './public/js/app/services/Socket.js'
    ])
    //.pipe(sourcemaps.init())
    .pipe(concat('app-min.js'))
    //only uglify if gulp is ran with '--type production'
    // gulp --type production
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/min'));
});

gulp.task('minify-css', function() {
  return gulp.src('./public/stylesheets/*.css')
    .pipe(concat('styles-min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./public/stylesheets/min'));
});
