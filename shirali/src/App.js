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
      playIcon: 'fa fa-play fa-2x',
      progress: 0.2,
    }
    this.renderPlayer = this.renderPlayer.bind(this);
    this.play = this.play.bind(this);
    this.correctIcon = this.correctIcon.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.backwardSong = this.backwardSong.bind(this);
    this.setProgress = this.setProgress.bind(this);
  }

  // componentDidMount(){
  //   Axios('')
  // }

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
        playIcon: 'fa fa-play fa-2x'
      })
    } else{
      this.setState({
        playIcon: 'fa fa-pause fa-2x'
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

  setProgress(e){
    let progress = (e.clientX - offsetLeft(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth
    console.log(e.clientX,offsetLeft(this.refs.progress_bar), this.refs.progress_bar.clientWidth )
    console.log(progress)
     this.setState({
       progress: progress
     })
    console.log(this.state.progress)
  }
  

  renderPlayer(){
    if(this.refs.player){
      let player = this.refs.player
      player.onended = () =>{
        this.nextSong();
      }
    }
    return(
      <div>
        <div className="player">
          <div className="imageContain">
            <img className="playerImage" src="https://images.rapgenius.com/797d59cbc13dfd824c1e40ad64e7286b.400x400x1.jpg" />
          </div>
          <a onClick={this.backwardSong} href="javascript:void();"><i className='fa fa-backward fa-2x' aria-hidden="true"></i></a>
          <a onClick={this.play} href="javascript:void();"><i className={this.state.playIcon} aria-hidden="true"></i></a>
          <a onClick={this.nextSong} href="javascript:void();"><i className='fa fa-forward fa-2x' aria-hidden="true"></i></a>
        
        <div className="currentTime">
    
        </div>
        <div onClick={this.setProgress} className="progress">
          <div ref="progress_bar" className="bar">
            <div style={{width: (this.state.progress * 100) + '%'}}></div>
          </div>
        </div>
        <div className="timeRemaining">

        </div>
        <audio ref="player" autoPlay={this.state.play}>
        <source src={this.state.file[0]} />
        </audio>
        </div>
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

function offsetLeft(el){
  let left = 0;
  while(el && el !== document){
    left += el.offsetLeft
    el = el.offsetParent;
  }
  return left;
}

export default App;
