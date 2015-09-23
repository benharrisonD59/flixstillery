var React = require( "react" );
var Panel = require( "react-bootstrap/lib/Panel" );

var Poster = React.createClass( {

  render: function() {
    return (
        <Panel header={this.props.title} className="Poster" bsStyle={this.props.exists}>
          <img src={this.props.poster} alt={this.props.tags} />
        </Panel>
    );
  }

} );

module.exports = Poster;
