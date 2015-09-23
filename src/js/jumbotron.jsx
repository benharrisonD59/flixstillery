var React = require( "react" );
var Jumbotron = require( "react-bootstrap/lib/Jumbotron" );

var Jibble = React.createClass( {
  render: function() {
    return (
      <Jumbotron>
        <h1>Flixstillery!!</h1>
        <p>A better drinking game!</p>
      </Jumbotron>
    );
  }
} );

module.exports = Jibble;
