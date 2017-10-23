import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/Search.css'

class Search extends Component{
	constructor(){
		super();
		this.state = {
			term:"",
			searchResults: false,
			rez: null,
		}
		this.handleInput = this.handleInput.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	handleInput(e){
		let term = e.target.value
		if(typeof term === "string"){
			this.setState({
				term: term,
			})
		}
	}

	handleSearch(e){
		e.preventDefault();
		axios({
			method: 'GET',
			url: `http://localhost:3001/api/v1/search/${this.state.term}`,
			headers: {
				'appSecret': 'eSrrxqt8MVAdJB6Xq9wzJZXdFq89MZo6',
				'deviceid': 'bade9d1e-a469-4bfc-aa9c-01bfb84850a6',
				'userid': '59d5c5b2e309815fada7875a'
				}
		}).then(data =>{
			// console.log(data)
			this.setState({
				rez: data,
				searchResults: true,
			})
		}).catch(err =>{ console.log(err)})
	}


	renderResults(){
		// render results here
		if(this.state.rez.data.songs.length > 0){
			return this.state.rez.data.songs.map(song =>{
				return(
					<div className="resultsContain">

					</div>
				)
			})
		} else{
			return (
				<div className="notFound">
					<p>No Results have been found for your search term {this.state.term}</p>
					<p>try again with a different term!</p>
				</div>
			)
		}
	}



	render(){
		return(
			<div className="searchPage">
				<div className="inputContain">
					<h4>Search for an Artist, Song, Album or Playlist</h4>
				 <input className="searchInput" placeholder="Search Term" type="text" name="term" value={this.state.term} onChange={this.handleInput}/>
				 <button className="searchButton" onClick={this.handleSearch}>SEARCH</button> 
				 {this.state.searchResults ? this.renderResults() : " "}
				</div>
			</div>
		)
	}
}

export default Search;