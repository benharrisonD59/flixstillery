var React = require( "react" );
var Panel = require( "react-bootstrap/lib/Panel" );

var Poster = React.createClass( {

  render: function() {
    return (
        <Panel footer={this.props.title} className="Poster">
          <img src={this.props.poster} alt={this.props.tags} />
        </Panel>
    );
  }

} );

module.exports = Poster;
