/**
 * A Login component for the Chat.Me application.
 *
*/

import React, {Component} from 'react'

class LoginOrSignUp extends Component {
	state = {
		isLoggingIn: true,
		submitButtonText: "Log In"
	}

	handleLoginOrSignUpClick = () => {
		this.setState({
			isLoggingIn: !this.state.isLoggingIn,
		}, () => {
			this.setState({submitButtonText: this.state.isLoggingIn ? "Log in" : "Sig Up"});
		});
	}

	render() {
		return (
			<div className="LoginOrSignUp">
				<form>
				 {!this.state.isLoggingIn ? (
  					  <div className="form-group">
  					    <input
  							type="text"
  							className="form-control"
  							id="displayName"
  							placeholder="Display Name"
  						/>
  					  </div>
  				  ) : ""}
				  <div className="form-group">
				    <input
						type="email"
						className="form-control"
						id="usernameField"
						aria-describedby="username"
						placeholder="Username"
					/>
				  </div>
				  <div className="form-group">
				    <input
						type="password"
						className="form-control"
						id="passwordInput"
						placeholder="Password"
					/>
				  </div>
				  <button type="submit" className="btn btn-primary">
					  {this.state.submitButtonText}
				  </button>
				  </form>
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
