import React, {Component} from 'react';
import axios from 'axios';

class Featured extends Component{
	constructor(){
		super()
		this.state = {
			user: null,
			rez: null,
		}
	}

	componentDidMount(){
		// axios({
		// 	method: 'GET',
		// 	url: `/api/v1/user/home/${this.state.user.data.id}`,
		// 	headers: {
		// 		"content-type": "application/json"
		// 	},
		// 	data: {

		// 	}
		// })
		console.log(this.props.userData)
	}


	render(){
			return(
				<div className="featured"> 
				
				</div>
			)
		}
}

export default Featured;