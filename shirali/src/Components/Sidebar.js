import React, { Component } from 'react';
import '../Styles/Sidebar.css';
import { Link } from 'react-router-dom'


class Sidebar extends Component{
	constructor(){
		super()
		this.state = {

		}
	}

	render(){
		return(
			<div className="sidebar">
				{/* <img href="" /> */}
				<div className="search">
					<Link to="/live/search" className="searchLink"><i className="fa fa-search" aria-hidden="true"></i>SEARCH</Link>
				</div>
				<div className="mainLinks">
					<Link to="/live" className="homeLink"><i className="fa fa-music" aria-hidden="true"></i>HOME</Link>
					<Link to="/live/my_music" className="myMusicLink"><i className="fa fa-music" aria-hidden="true"></i>MY MUSIC</Link>
				</div>
				<hr />
				<div className="recent">
				<p>RECENTLY PLAYED</p>
				</div>
				<div className="user">
					<hr />
					<Link to="#0" className="userLink">add user name here</Link>
				</div>
			</div>
		)
	}
}

export default Sidebar;