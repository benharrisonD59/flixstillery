var React = require( "react" );
var Jumbotron = require( "react-bootstrap/lib/Jumbotron" );

var Jibble = React.createClass( {


  render: function() {
    var styles = {
      jumbotron: {
        background: "#2c3e50",
        color: "#ecf0f1",
        margin: "11px",
        padding: "0",
        borderBottom: "3px solid #ecf0f1",
        textAlign: "center",
        boxShadow: "0px 4px 2px -2px rgba(0,0,0,0.6)"
      },
      h1: {
        fontFamily: "'Yantramanav', sans-serif",
        fontWeight: "lighter",
        fontSize: "9em",
        textShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)"
      }
    };

    return (
      <Jumbotron style={styles.jumbotron}>
        <h1 style={styles.h1}>Flixstillery!!</h1>
      </Jumbotron>
    );
  }
} );

module.exports = Jibble;
