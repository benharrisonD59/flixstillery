var gulp = require( 'gulp' );

var plugins = {
  autoprefixer: require( 'gulp-autoprefixer' ),
  babelify: require( 'babelify' ),
  browserify: require( 'browserify' ),
  cache: require( 'gulp-cache' ),
  changed: require( 'gulp-changed' ),
  connect: require( "gulp-connect" ),
  del: require( "del" ),
  htmlReplace: require( 'gulp-html-replace' ),
  htmlmin: require( 'gulp-htmlmin' ),
  imagemin: require( 'gulp-imagemin' ),
  jshint: require( 'gulp-jshint' ),
  minifyCss: require( 'gulp-minify-css' ),
  rename: require( 'gulp-rename' ),
  sass: require( 'gulp-sass' ),
  sourcemaps: require( 'gulp-sourcemaps' ),
  streamify: require( 'gulp-streamify' ),
  uglify: require( 'gulp-uglify' ),
  vss: require( 'vinyl-source-stream' ),
  watchify: require( 'watchify' )
};

var path = {
  SOURCE: './src/',
  AUDIO: './src/assets/audio/',
  JSON: './src/assets/json/',
  FONTS: './src/assets/fonts/',
  IMAGES: './src/assets/images/',
  BUILD: './build/',
  DIST: './dist/'
};

var files = [ "jsx", "sass", "html", "helpers" ];

function defineTasks() {
  // Pull in task definitions
  files.forEach( function( file ) {
    require( "./gulp-tasks/" + file )( gulp, plugins, path );
  } );

  gulp.task( 'watch', [
    'webserver',
    'watch-jsx',
    'watch-html',
    'watch-sass'
  ] );
  gulp.task( 'default', [
    'html',
    'jsx',
    'sass',
    'audio',
    'fonts',
    'images',
    'jshint'
  ] );
}

defineTasks();
