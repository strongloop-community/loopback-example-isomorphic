var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var browserify = require('browserify');
var boot = require('loopback-boot');
var path = require('path');
var fs = require('fs');

gulp.task('default', [
  'clean',
  'build:assets',
  'build:lb-client',
  'install'
]);

gulp.task('clean', function(done) {
  del(['client/dist/**/*'], done);
});

gulp.task('build:assets', ['clean'], function() {
  var assets = [
    {src: 'angular/angular.js'},
    {src: 'angular-resource/angular-resource.js'},
    {src: 'angular-ui-router/release/angular-ui-router.js'},
    {src: 'bootstrap/dist/css/bootstrap.css', dest: 'css'},
    {src: 'bootstrap/dist/css/bootstrap.css.map', dest: 'css'},
    {src: 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
      dest: 'fonts'},
    {src: 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
      dest: 'fonts'},
    {src: 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
      dest: 'fonts'},
    {src: 'bootstrap/dist/js/bootstrap.js'},
    {src: 'jquery/dist/jquery.js'}
  ];
  assets.forEach(function(asset) {
    var dest = 'client/public/';
    dest += asset.dest ? asset.dest : 'vendor';
    gulp.src('client/bower_components/' + asset.src)
      .pipe(gulp.dest(dest));
  });
});

gulp.task('build:lb-client', ['clean'], function(done) {
  var b = browserify({basedir: path.resolve(__dirname, 'client/loopback')});
  b.require(path.resolve(__dirname, 'client/loopback/index.js'),
    {expose: 'lbclient'});
  try {
    boot.compileToBrowserify({appRootDir: path.resolve(__dirname,
      'client/loopback')}, b);
  } catch(e) {
    throw e;
  }

  var target = fs.createWriteStream('client/public/js/bundle.js');
  target
    .on('error', done)
    .on('close', done);
  b.bundle().pipe(target);
});

gulp.task('install', [
  'clean',
  'build:assets',
  'build:lb-client'
], function() {
  gulp.src('client/public/**/*')
    .pipe(gulp.dest('client/dist'));
});
