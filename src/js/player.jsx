var React = require("react/addons");
var Panel = require("react-bootstrap/lib/Panel");
var ButtonGroup = require("react-bootstrap/lib/ButtonGroup");
var Button = require("react-bootstrap/lib/Button");
var Glyphicon = require("react-bootstrap/lib/Glyphicon");
var ProgressBar = require("react-bootstrap/lib/ProgressBar");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var data = require("../assets/json/movies.json");

var Player = React.createClass({

  getInitialState: function() {
    return {
      track: data.movies[0],
      playing: false,
      comment: "",
      distance: 0,
      elapsedTime: 0
    };
  },

  componentDidMount: function() {
    this.modifyTime = 0;
    this.currentTime = 0;
    this.startTime = 0;
    this.blip = new Audio('/audio/blip.wav');
    this.updateTime();
  },

  componentWillUnmount: function() {
    window.cancelAnimationFrame(this.request);
  },

  playHandler: function() {
    this.setState({
      playing: !this.state.playing
    });
    this.startTime = new Date().getTime();
    this.modifyTime = this.state.elapsedTime;
  },

  timeModifier: function(howMuch) {
    this.modifyTime += howMuch;
  },

  updateTime: function() {
    this.state.playing ? this.currentTime = new Date().getTime() : false;
    var newTime = this.modifyTime + (this.currentTime - this.startTime);
    if (newTime < 0) {
      this.modifyTime = 0;
      this.currentTime = 0;
      this.startTime = 0;
      newTime = 0;
      this.setState({
        playing: false
      });
    } else if (newTime >= (this.state.track.length * 60 * 1000)) {
      this.modifyTime = this.state.track.length * 60 * 1000;
      this.currentTime = 0;
      this.startTime = 0;
      newTime = this.state.track.length * 60 * 1000;
      this.setState({
        playing: false
      });
    }
    this.getComment(newTime);
    this.setState({
      elapsedTime: newTime,
      distance: (newTime / (this.state.track.length * 60 * 1000)) * 100
    });
    this.request = window.requestAnimationFrame(this.updateTime);
  },

  getComment: function(time) {
    var introLength = this.state.track.tracks[0].iLength * 1000;
    if (time <= introLength) {
      var newerComment = this.state.track.tracks[0][this.timeFormatter(time) + " - intro"];
      if (newerComment && this.newComment != newerComment){
        this.newComment = newerComment;
        if (this.state.playing && this.newComment != " ") {
          this.blip.play();
        };
        this.setState({
          comment: this.newComment
        });
      }
    } else {
      var newerComment = this.state.track.tracks[0][this.timeFormatter(time - introLength)];
      if (newerComment && this.newComment != newerComment){
        this.newComment = newerComment;
        if (this.state.playing && this.newComment != " ") {
          this.blip.play();
        };
        this.setState({
          comment: this.newComment
        });
      }
    }
  },

  timeFormatter: function(time) {
    var hrPad, minPad, secPad, formattedTime = '';
    parseInt(time / 1000 % 60).toFixed(0).length == 1 ? secPad = "0" : secPad = "";
    formattedTime += secPad + parseInt(time / 1000 % 60).toFixed(0);
    parseInt(time / 1000 / 60 % 60).toFixed(0).length == 1 ? minPad = "0" : minPad = "";
    formattedTime = minPad + parseInt(time / 1000 / 60 % 60).toFixed(0) + "." + formattedTime;
    parseInt(time / 1000 / 60 / 60).toFixed(0).length == 1 ? hrPad = "0" : hrPad = "";
    formattedTime = hrPad + parseInt(time / 1000 / 60 / 60).toFixed(0) + ":" + formattedTime;
    return formattedTime;
  },

  render: function() {
    var playIcon = this.state.playing ? 'pause' : 'play';
    var btnColor = this.state.playing ? 'success' : 'warning';
    return (
      <div>
        <Panel>
          <ReactCSSTransitionGroup transitionName="commentAnimation">
            <p key={this.state.comment}>{this.state.comment}</p>
          </ReactCSSTransitionGroup>
        </Panel>
        <ProgressBar now={this.state.distance} bsStyle="warning" style={this.state.commentBarVis}/>
        <ButtonGroup justified>
          <Button className="btnNoClrChng">{this.state.track.title}</Button>
          <Button className="btnNoClrChng" onClick={this.timeModifier.bind(this, -5000)}><Glyphicon glyph="fast-backward"/></Button>
          <Button className="btnNoClrChng" onClick={this.timeModifier.bind(this, -500)}><Glyphicon glyph="backward"/></Button>
          <Button className="btnNoClrChng" onClick={this.playHandler}><Glyphicon glyph={playIcon}/></Button>
          <Button className="btnNoClrChng" onClick={this.timeModifier.bind(this, 500)}><Glyphicon glyph="forward"/></Button>
          <Button className="btnNoClrChng" onClick={this.timeModifier.bind(this, 5000)}><Glyphicon glyph="fast-forward"/></Button>
          <Button className="btnColorChng" bsStyle={btnColor}>{this.timeFormatter(this.state.elapsedTime)}</Button>
        </ButtonGroup>
      </div>
    );
  }
});

module.exports = Player;
