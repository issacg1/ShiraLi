import React, { Component } from 'react';
import '../Styles/Nav.css';

class Nav extends Component{

  render(){
    return(
			<div className="nav">
				<div className="navContain">
					<a href="#0" className="navLink">FEATURED</a>
					<a href="#0" className="navLink">GENRES</a>
					<a href="#0" className="navLink">RECOMMENDED</a>
					<a href="#0" className="navLink">PLAYLISTS</a>
				</div>
			</div>
    )
  }
}

export default Nav;