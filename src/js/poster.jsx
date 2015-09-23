var React = require( "react" );

var Poster = React.createClass( {

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <img src={this.props.poster} alt={this.props.tags} />
      </div>
    );
  }

} );

module.exports = Poster;
