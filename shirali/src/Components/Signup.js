import React, { Component } from 'react';
import '../Styles/Signup.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Signup extends Component{
	constructor(){
		super()
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			role: "user",
			fireRedirect: false,
		}
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
			url: 'http://localhost:3001/v1/auth/signup',
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
				role: this.state.role
			},
		}).then(data =>{
			if(data.data.success){
				this.props.sendLogin(data)
				this.setState({
					fireRedirect: true
				})
			}
		}).catch(err =>{
			console.log(err)
		})
	} 

	
		

	render(){
			return(
				<div className="mainContain">
					<div className="formContain">
						<h2>Sign up!</h2>
						<form className="signupForm">
							<label>First Name</label>
							<input placeholder="First Name" type="text" name="firstname" value={this.state.firstname} onChange={e =>{this.handleInputChange(e)}}/>
							<label>Last Name</label>
							<input placeholder="Last Name" type="text" name="lastname" value={this.state.lastname} onChange={e =>{this.handleInputChange(e)}}/>
							<label>Email</label>
							<input placeholder="Email" type="email" name="email" value={this.state.email} onChange={e =>{this.handleInputChange(e)}}/>
							<label>Password</label>
							<input placeholder="Password" type="password" name="password" value={this.state.password} onChange={e =>{this.handleInputChange(e)}}/>
							<button className="signupButton" onClick={event =>{this.handleFormSubmit(event)}}>Create Account</button>
							<p><Link to={`/login`}>Have an account? Login here!</Link></p>
						</form>
						{this.state.fireRedirect ? <Redirect push to={`/live`} /> : ''}	
					</div>
				</div>
			)
	}
}

export default Signup;