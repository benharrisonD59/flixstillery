var React = require("react");
var Panel = require("react-bootstrap/lib/Panel");
var ButtonGroup = require("react-bootstrap/lib/ButtonGroup");
var Button = require("react-bootstrap/lib/Button");
var Glyphicon = require("react-bootstrap/lib/Glyphicon");

var data = require("../assets/json/movies.json");

var Player = React.createClass({

  getInitialState: function() {
    return {
      track: data.movies[0].tracks[0],
      playing: false,
      elapsedTime: 0
    };
  },

  componentDidMount: function() {
    this.updateTime();
  },

  componentWillUnmount: function() {
    window.cancelAnimationFrame(this.request);
  },

  playHandler: function() {
    this.setState({ playing: !this.state.playing });
    this.startTime = new Date().getTime();
  },

  updateTime: function() {
    if (this.state.playing) {
      var currentTime = new Date().getTime();
      this.setState({
        elapsedTime: this.state.elapsedTime = (currentTime - this.startTime)
      });
    }
    this.request = window.requestAnimationFrame(this.updateTime);
  },

  timeFormatter: function(time) {
    var hrPad, minPad, secPad, formattedTime = '';
    parseInt(time / 1000 % 60).toFixed(0).length == 1 ? secPad = "0" : secPad = "";
    formattedTime += secPad + parseInt(time / 1000 % 60).toFixed(0);
    parseInt(time / 1000 / 60).toFixed(0).length == 1 ? minPad = "0" : minPad = "";
    formattedTime = minPad + parseInt(time / 1000 / 60).toFixed(0) + "." + formattedTime;
    parseInt(time / 1000 / 60 / 60).toFixed(0).length == 1 ? hrPad = "0" : hrPad = "";
    formattedTime = hrPad + parseInt(time / 1000 / 60 / 60).toFixed(0) + ":" + formattedTime;
    return formattedTime;
  },

  render: function() {
    var playIcon = this.state.playing ? 'pause' : 'play';
    return (
      <div>
        <Panel>
          <p>{this.timeFormatter(this.state.elapsedTime)}</p>
        </Panel>
        <ButtonGroup justified>
          <Button><Glyphicon glyph="fast-backward"/></Button>
          <Button><Glyphicon glyph="backward"/></Button>
          <Button onClick={this.playHandler}><Glyphicon glyph={playIcon}/></Button>
          <Button><Glyphicon glyph="forward"/></Button>
          <Button><Glyphicon glyph="fast-forward"/></Button>
        </ButtonGroup>
      </div>
    );
  }
});

module.exports = Player;
