var gulp = require('gulp');
var tsc = require('gulp-typescript');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');

var SOURCE = './app';
var DEST = './dist';
var DEBUG = './debug';
var SERVER = '/server';
var CLIENT = '/client';
var watchConf = {
  debounceDelay: 1000
};

var tsServer = tsc.createProject(SOURCE + SERVER + '/tsconfig.json');
var tsClient = tsc.createProject(SOURCE + CLIENT + '/tsconfig.json');


gulp.task('build', ['type_server', 'type_client', 'copy']);
gulp.task('default', ['build']);
gulp.task('debug',['copy', 'copy_debug', 'type_server_debug', 'type_client_debug']);

//build tasks
gulp.task('type_server',  function () {
    gulp.src(SOURCE + SERVER + '/**/*.ts', {
    })
      .pipe(tsc(tsServer))
      .pipe(gulp.dest(DEST + SERVER));
  });

gulp.task('type_client', function () {
  gulp.src(SOURCE + CLIENT + '/**/*.ts')
    .pipe(tsc(tsClient))
    .pipe(gulp.dest(DEST + CLIENT));
});
gulp.task('copy', function () {
  gulp.src(SOURCE + CLIENT + '/**/*.html')
    .pipe(gulp.dest(DEST + CLIENT));
});


//debug tasks
gulp.task('copy_debug', function () {
  gulp.src(SOURCE + '/**/*.ts')
    .pipe(gulp.dest(DEBUG));
  gulp.src(SOURCE + CLIENT + '/**/*.html')
    .pipe(gulp.dest(DEBUG + CLIENT));
  gulp.src(SOURCE + '/**/*.json')
    .pipe(gulp.dest(DEBUG));
});
gulp.task('type_server_debug',  function () {
    gulp.src(SOURCE + SERVER + '/**/*.ts', {
    })
      .pipe(sourcemaps.init())
      .pipe(tsc(tsServer))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DEBUG + SERVER));
  });
gulp.task('type_client_debug', function () {
  gulp.src(SOURCE + CLIENT + '/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsClient))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEBUG + CLIENT));
});