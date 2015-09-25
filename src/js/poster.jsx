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