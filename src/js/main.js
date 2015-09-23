var React = require( "react" );
var Jumbotron = require( "./jumbotron.jsx" );
var Poster = require( "./poster.jsx" );

var data = require( "../assets/json/movies.json" );


var App = React.createClass( {

  getInitialState: function() {
    return {
      movies: data.movies
    };
  },

  render: function() {
    return (
      <div>
        <Jumbotron / >
        <div className="posterContainer">
          {this.state.movies.map(function(movie) {
            return (
              <Poster
                title={movie.title}
                poster={movie.poster}
                tags={movie.tags}
                exists={movie.exists}
              />
            );
          })}
        </div>
      </div>
    );
  }

} );

React.render( <App />, document.getElementById( 'main' ) );
