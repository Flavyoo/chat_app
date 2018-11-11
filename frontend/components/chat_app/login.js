/**
 * A Login component for the Chat.Me application.
 *
*/

import React, {Component} from 'react'
import { Redirect, Route, BrowserRouter} from 'react-router'
import Cookies from 'js-cookie';
import axios from 'axios';

const ENTER = 13;
const DISPLAY_NAME = 0;
const USERNAME = 1;
const PASSWORD = 2;
const LOGIN_ENDPOINT = "/login/";
const REGISTER_ENDPOINT = "/chat/register/";

class LoginOrSignUp extends Component {
	state = {
		isLoggingIn: true,
		submitButtonText: "Log In",
		displayName: "",
		username: "",
		password: "",
		redirect: false,
	}

    handleSubmit = () => {
      let csrfToken = Cookies.get('csrftoken')
	  let endpoint = this.state.isLoggingIn ? LOGIN_ENDPOINT : REGISTER_ENDPOINT;
	  axios({
		  url: endpoint,
		  method: "POST",
		  data: {
			  username: this.state.username,
			  password: this.state.password,
			  displayName: this.state.displayName,
		  },
		  headers: {"X-CSRFToken": csrfToken},
		  responseType: "document",
	  }).then(function (response) {
		  // process login error, password issues from server here
		  window.location = "/chat/";
      });
    }


	handleChange = (e, type) => {
		switch(type) {
			case DISPLAY_NAME:
			    this.setState({displayName: e.target.value});
				break;
			case USERNAME:
			    this.setState({username: e.target.value});
				break;
			case PASSWORD:
			    this.setState({password: e.target.value});
			default:
			    return false;
		}
	}

	onButtonKeyDown = (e) => {
		if (e.key === 'Enter') {
			//e.preventDefault();
			this.handleSubmit();
			return false;
		}
	}

	handleLoginOrSignUpClick = () => {
		this.setState({
			isLoggingIn: !this.state.isLoggingIn,
		}, () => {
			this.setState({submitButtonText: this.state.isLoggingIn ? "Log in" : "Sign Up"});
		});
	}

	render() {
		const { redirect } = this.state;
		const csrftoken = Cookies.get('csrftoken');
		return (
			<div className="LoginOrSignUp">
				 {!this.state.isLoggingIn ? (
  					  <div className="form-group">
  					    <input
  							type="text"
  							className="form-control"
  							id="displayName"
  							placeholder="Display Name"
							value={this.state.displayName}
							onKeyDown={(e) => {this.onButtonKeyDown(e)}}
							onChange={(e) => {this.handleChange(e, DISPLAY_NAME)}}
  						/>
  					  </div>
  				  ) : ""}
				  <div className="form-group">
				    <input
						name="username"
						type="username"
						className="form-control"
						id="usernameField"
						aria-describedby="username"
						placeholder="Username"
						value={this.state.username}
						onKeyDown={(e) => {this.onButtonKeyDown(e)}}
						onChange={(e) => {this.handleChange(e, USERNAME)}}
					/>
				  </div>
				  <div className="form-group">
				    <input
						name="password"
						type="password"
						className="form-control"
						id="passwordInput"
						placeholder="Password"
						value={this.state.password}
						onKeyDown={(e) => {this.onButtonKeyDown(e)}}
						onChange={(e) => {this.handleChange(e, PASSWORD)}}
					/>
				  </div>
				  <button
					  type="submit"
					  onClick={this.handleSubmit}
					  className="btn btn-primary"
					>
					{this.state.submitButtonText}
				  </button>
				  {this.state.isLoggingIn ? (
				    <p className="LoginOrSignUp-message">
						{`Don't have an account? `}
						<a
							className="LoginOrSignUp-authButton"
							style={{color: "#3AE071", cursor: "pointer"}}
							onClick={this.handleLoginOrSignUpClick}>
							Sign Up
						</a>
					</p>
				  ) : (
					<p className="LoginOrSignUp-message">
						{`Already have an account? `}
						<a
							className="LoginOrSignUp-authButton"
							style={{color: "#3AE071", cursor: "pointer"}}
							onClick={this.handleLoginOrSignUpClick}>
							Login Here
						</a>
					</p>
				  )}
		    </div>
		);
	}
}

export default LoginOrSignUp;
