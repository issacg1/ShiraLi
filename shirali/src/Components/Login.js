import React, { Component } from 'react';
import '../Styles/Login.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component{
	constructor(){
		super()
		this.state = {
					fireRedirect: false,
					email: "",
					password: "",
				}
				this.handleInputChange = this.handleInputChange.bind(this)

		}
		
		handleInputChange(e){
			e.preventDefault();
			const name = e.target.name;
			const value = e.target.value;
			
			this.setState({
				[name]: value,
			});
		}

		handleFormSubmit(event) {
			event.preventDefault();
			axios({
				method: 'POST',
				url: 'http://localhost:3001/v1/auth/login',
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					email: this.state.email,
					password: this.state.password,
				},
				
			}).then(data =>{
				console.log(data)
			}).catch(err =>{console.log(err)})
		}


	render(){
		return(
			<div className="login">
				<div className="form">
					<form className="loginForm" onSubmit={(event)=> {this.handleFormSubmit(event)}}>
						<label>
							Email
						</label>
						<input name="email" placeholder="Email" type="text" value={this.state.email} onChange={(event)=> {this.handleInputChange(event)}}/>
						<label>
							Password
						</label>
						<input name="password" placeholder="Password" type="password" value={this.state.password} onChange={(event)=> {this.handleInputChange(event)}}/>
						<input className="submit" type="submit" value="Log In" />
					</form>
				</div>
				{this.state.fireRedirect ? <Redirect push to={`/live`} /> : ''}
				<p><Link to={`/signup`}>Don't have an account? Register here!</Link></p>
			</div>
		)
	}
}

export default Login