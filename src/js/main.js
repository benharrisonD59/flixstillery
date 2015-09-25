var React = require( "react" );
var Jumbotron = require( "./jumbotron.jsx" );
var Player = require( "./player.jsx" );

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
        <Player />
      </div>
    );
  }

} );

React.render( <App />, document.getElementById( 'main' ) );
