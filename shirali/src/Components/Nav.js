import React, { Component } from 'react';
import '../Styles/Nav.css';
import { Link } from 'react-router-dom'

class Nav extends Component{

  render(){
    return(
			<div className="nav">
				<div className="navContain">
					<Link to="/live/featured" className="navLink">FEATURED</Link>
					<Link to="/live/genres" className="navLink">GENRES</Link>
					<Link to="/live/recommended" className="navLink">RECOMMENDED</Link>
					<Link to="/live/playlists" className="navLink">PLAYLISTS</Link>
				</div>
			</div>
    )
  }
}

export default Nav;