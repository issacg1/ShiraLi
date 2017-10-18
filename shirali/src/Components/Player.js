import React, { Component } from 'react';
import '../Styles/Player.css';
import axios from 'axios';

class Player extends Component{
    constructor(){
        super()
        this.state = {
          rez: null,
          file: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3","https://shiralidevelopment.s3-us-west-1.amazonaws.com/59a6010f0afc7020b7ccee0c/Despacito+%5BHebrew+Version%5D%281%29_1504051553255.mp3"],
          currentSong: 0,
          play: false,
          playIcon: 'fa fa-play fa-2x',
          progress: 0.0,
          in_set_progress_mode: false,
          backwardSongClicks: 0,
        }
        this.is_progress_dirty = false;
        this.interval_id = setInterval(this.onUpdate.bind(this), 250);
        this.play = this.play.bind(this);
        this.correctIcon = this.correctIcon.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.backwardSong = this.backwardSong.bind(this);
        this.setProgress = this.setProgress.bind(this);
      }
    
      componentDidMount(){
        axios({
          method: 'GET',
          url: 'http://localhost:3001/api/v1/song/active',
          headers: {
            'appSecret': 'eSrrxqt8MVAdJB6Xq9wzJZXdFq89MZo6',
            'deviceid': 'bade9d1e-a469-4bfc-aa9c-01bfb84850a6',
            'userid': '59d5c5b2e309815fada7875a'
            }
        }).then(data =>{
          this.setState({
              rez: data
          })
          console.log(this.state.rez.data)
        }).catch(err =>{
          console.log(err)
        })
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
            playIcon: 'fa fa-play fa-2x'
          })
        } else{
          this.setState({
            playIcon: 'fa fa-pause fa-2x'
          })
        }
      }
    
      backwardSong(){
        let updatedClicks = this.state.backwardSongClicks + 1
        this.setState({
          backwardSongClicks: updatedClicks
        })
    
        let current = this.state.currentSong
        current -= 1
        if(this.state.backwardSongClicks === 0){
          this.setState({
            progress: 0.0,
          })
          this.refs.player.currentTime = 0;
        } else {
          if(current >= 0){
            this.setState({
              currentSong: current,
              backwardSongClicks: 0,
            })
            this.refs.player.src = this.state.file[current]
          }else{
            this.refs.player.pause();
            console.log("end of songs!")
          }
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
          this.refs.player.src = ""
          console.log("end of songs!")
        }
      }
    
      startSetProgress(evt){
        this.setState({
          in_set_progress_mode: true
        })
        this.setProgress(evt)
      }
    
      setProgress(e){
        if(this.state.in_set_progress_mode){
          let progress = (e.clientX - offsetLeft(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth
          console.log(progress)
          this.setState({
            progress: progress,
          })
          this.is_progress_dirty = true;
        }
      }
    
      stopSetProgress(evt){
        this.setState({
          in_set_progress_mode: false
        })
      }
    
      onUpdate(){
        var player = this.refs.player;
          if(player && !this.is_progress_dirty){
            this.setState({
              progress: player.currentTime / player.duration
            })
          }
        }
    
      render(){
        var currentTime = 0;
        var totalTime = 0;
    
        if(this.refs.player){
          var player = this.refs.player
          player.onended = () =>{
            this.nextSong();
          }
        
    
          if(this.is_progress_dirty){
            this.is_progress_dirty = false;
            player.currentTime = player.duration * this.state.progress;
          }
    
          currentTime = player.currentTime
          totalTime = player.duration
        }
    
        return(
          <div className="player-container">
            <div className="player">
              <div className="imageContain">
                <img className="playerImage" src="https://images.rapgenius.com/797d59cbc13dfd824c1e40ad64e7286b.400x400x1.jpg" alt=""/>
              </div>
              <a onClick={this.backwardSong} href="#0"><i className='fa fa-backward fa-2x' aria-hidden="true"></i></a>
              <a onClick={this.play} href="#0"><i className={this.state.playIcon} aria-hidden="true"></i></a>
              <a onClick={this.nextSong} href="#0"><i className='fa fa-forward fa-2x' aria-hidden="true"></i></a>
            <div className="timePlayerContain">
                <div className="currentTime">
                {formatTime(currentTime)}
                </div>
                <div 
                onMouseDown={this.startSetProgress.bind(this)} 
                onMouseMove={this.setProgress.bind(this)} 
                onMouseLeave={this.stopSetProgress.bind(this)} 
                onMouseUp={this.stopSetProgress.bind(this)}
                className="progress">
                <div ref="progress_bar" className="bar">
                    <div style={{width: (this.state.progress * 100) + '%'}}></div>
                </div>
                </div>
                <div className="timeRemaining">
                {formatTime(totalTime)}
                </div>
            </div>
            <audio ref="player" autoPlay={this.state.play}>
            <source src={this.state.file[0]} />
            </audio>
            </div>
          </div>
        )
    }
}

function format2Number(num) {
    var str = num + '';
    if (str.length === 1) {
        return '0' + str;
    }
    if (str.length === 0) {
        return '00';
    }
    return str;
}
    
function formatTime(s) {
    if (!s && s !== 0) {
        return '??:??';
    }
    var total_seconds = Math.floor(s);
    var hours = Math.floor(total_seconds / 3600);
    var minutes = Math.floor(total_seconds / 60) - hours * 60;
    var seconds = total_seconds - minutes * 60 - hours * 3600;
    
    if (hours) {
        return hours + ':' + format2Number(minutes) + ':' + format2Number(seconds);
    }
    
    return format2Number(minutes) + ':' + format2Number(seconds);
}
    
function offsetLeft(el){
    let left = 0;
    while(el && el !== document){
        left += el.offsetLeft
        el = el.offsetParent;
    }
    return left;
}

export default Player