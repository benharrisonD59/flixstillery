module.exports = function( gulp, plugins, path ) {

  function clean() {
    plugins.del(path.BUILD);
    plugins.del(path.DIST);
    plugins.cache.clearAll();
  }

  function webserver() {
    plugins.connect.server( {
      livereload: true,
      root: './build'
    } );
  }

  function jshint() {
    gulp.src( path.BUILD + 'js/*.js' )
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter( 'default' ) );
  }

  function audio() {
    gulp.src( path.AUDIO + "*.*" )
      .pipe( gulp.dest( path.BUILD + "/audio" ) )
      .pipe( gulp.dest( path.DIST + "/audio" ) );
  }

  function fonts() {
    gulp.src( path.FONTS + "**/*.*" )
      .pipe( gulp.dest( path.BUILD + "/fonts" ) )
      .pipe( gulp.dest( path.DIST + "/fonts" ) );
  }

  function images() {
    gulp.src( path.IMAGES + '*.*' )
      .pipe( plugins.cache( plugins.imagemin( {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      } ) ) )
      .pipe( gulp.dest( path.BUILD + '/images' ) )
      .pipe( gulp.dest( path.DIST + '/images' ) );
  }

  gulp.task( 'clean', clean );
  gulp.task( 'jshint', jshint );
  gulp.task( 'audio', audio );
  gulp.task( 'fonts', fonts );
  gulp.task( 'images', images);
  gulp.task( 'webserver', webserver );
};
