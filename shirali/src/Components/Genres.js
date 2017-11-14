import React, { Component } from 'react';
import axios from 'axios'; 
import '../Styles/Genres.css'

class Genres extends Component{
    constructor(){
        super()
        this.state = {
			dataLoaded: false,
			_ids: null,
			genres: null,
			icons: undefined,
		}
		this.renderIcons.bind(this);
    }

	componentDidMount(){
			axios({
				url: "http://localhost:3001/api/v1/genre/active",
				method: "GET",
				headers: {
						'appSecret': 'eSrrxqt8MVAdJB6Xq9wzJZXdFq89MZo6',
						'deviceid': 'bade9d1e-a469-4bfc-aa9c-01bfb84850a6',
						'userid': '59d5c5b2e309815fada7875a'
						}
			}).then(data =>{
				console.log(data.data.genres[0]._id)
				let genres = [];
				let icons = [];
				let ids = [];
				data.data.genres.forEach(function(genre) {
					genres.push(genre.title)
					icons.push(genre.icon)
					ids.push(genre._id)
				}, this);
				this.setState({
					genres: genres,
					icons: icons,
					dataLoaded: true,
					_ids: ids
				})
			}).catch(err =>{
				console.log(err)
			})
	}

	renderIcons(){
		return this.state.icons.map((icon, i) =>{
			return (
				<div>
				<img className="image" src={icon} name={this.state._ids[i]} onClick={(e) => {this.handleSearch(e)}}></img> 
				<p className="genre">{this.state.genres[i]}</p>
				</div>
			)
		})
		this.setState({
			dataLoaded: false
		})
	}

	handleSearch(e){
		let term = e.target.name
		console.log(term)
		// send data to search component. push to search component
	}


    render(){
        return(
      <div className="genreList">
				<h1 className="headerCopy">Genres & Moods</h1>
				<div className="imageContain">
        {this.state.dataLoaded ? this.renderIcons() : ""}
				</div>
			</div>
        )
    }

}

export default Genres;