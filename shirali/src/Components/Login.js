import React, { Component } from 'react';
import '../Styles/Login.css';

class Login extends Component{
    constructor(){
        super()
        this.state = {
					fireRedirect: false,
					username: "",
					password: null,
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
      let data = {
        username: this.state.username,
        password: this.state.password_digest
			}
		} //add a fetch/axios post req to confirm 
   
        


    render(){
        return(
            <div className="login">
							<div className="form">
								<form className="loginForm" onSubmit={(event)=> {this.handleFormSubmit(event)}}>
									<label>
										Username
									</label>
									<input name="username" placeholder="Username" type="text" value={this.state.username} onChange={(event)=> {this.handleInputChange(e)}}/>
									<label>
										Password
									</label>
									<input name="password" placeholder="Password" type="password" value={this.state.password} onChange={(event)=> {this.handleInputChange(e)}}/>
									<input className="submit" type="submit" value="Log In" />
								</form>
							</div>
							{this.state.fireRedirect ? <Redirect push to={``} /> : ''}
							<p><Link to={`/auth/register`}>Don't have an account? Register here!</Link></p>
            </div>
        )
    }
}

export default Login