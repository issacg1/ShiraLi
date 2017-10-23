import React, { Component } from 'react';
import '../Styles/Sidebar.css';


class Sidebar extends Component{
	constructor(){
		super()
		this.state = {

		}
	}

	render(){
		return(
			<div className="sidebar">
				<img href="" />
				<div className="search">
					<a href="/search" className="searchLink"><i className="fa fa-search" aria-hidden="true"></i>SEARCH</a>
				</div>
				<div className="mainLinks">
					<a href="/" className="homeLink"><i className="fa fa-music" aria-hidden="true"></i>HOME</a>
					<a href="/my_music" className="myMusicLink"><i className="fa fa-music" aria-hidden="true"></i>MY MUSIC</a>
				</div>
				<hr />
				<div className="recent">
				<p>RECENTLY PLAYED</p>
				</div>
				<div className="user">
					<hr />
					<a href="#0" className="userLink">add user name here</a>
				</div>
			</div>
		)
	}
}

export default Sidebar;