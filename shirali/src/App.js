import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Player from './Components/Player';
import ReactAudioPlayer from 'react-audio-player';

//change "file" wthin state to equal to the rez src element
class App extends Component {
  constructor(){
    super()
    this.state = {
      rez: null,
      file: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3","https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"],
      currentSong: 0,
      play: false,
      playIcon: 'fa fa-play',
    }
    this.renderPlayer = this.renderPlayer.bind(this);
    this.play = this.play.bind(this);
    this.correctIcon = this.correctIcon.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.backwardSong = this.backwardSong.bind(this)
  }

  play(){
    if(this.state.play === false){
      this.setState({
        play: true,
      })
      this.refs.player.play();
    }else{
      this.refs.player.pause()
      this.setState({
        play: false
      })
    }
    this.correctIcon()
  }

  correctIcon(){
    if(this.state.play){
      this.setState({
        playIcon: 'fa fa-play'
      })
    } else{
      this.setState({
        playIcon: 'fa fa-pause'
      })
    }
  }

  backwardSong(){
    let current = this.state.currentSong
    current -= 1
    let songLength = this.state.file.length - 1
    if(current >= 0){
      this.setState({
        currentSong: current,
      })
      this.refs.player.src = this.state.file[current]
    }else{
      console.log("end of songs!")
    }
  }

  nextSong(){
    let current = this.state.currentSong
    current += 1
    let songLength = this.state.file.length - 1
    if(songLength >= current){
      this.setState({
        currentSong: current,
      })
      this.refs.player.src = this.state.file[current]
    }else{
      console.log("end of songs!")
    }
  }

  renderPlayer(){
    return(
      <div>
        <div className="player">
          <a onClick={this.backwardSong} href="javascript:void();"><i className='fa fa-backward'></i></a>
          <a onClick={this.play} href="javascript:void();"><i className={this.state.playIcon}></i></a>
          <a onClick={this.nextSong} href="javascript:void();"><i className='fa fa-forward'></i></a>
        </div>
        <audio ref="player" autoPlay={this.state.play}>
        <source src={this.state.file[0]} />
        </audio>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPlayer()}
      </div>
      // <Router>
      //   <div>
      //     <Route path="/" component={Player} />
      //   </div>
      // </Router>
    );
  }
}

export default App;
