/**
 * The Home page for Chat.Me application.
 *
*/

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoginOrSignUp from './login';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div className="container-fluid">
					<div className="Home-header">
						<p className="Home-header-title">Chat.Me</p>
					</div>
					<LoginOrSignUp/>
				</div>
			</div>
		);
	}
}

const element = <Home/>
ReactDOM.render(element, document.getElementById('Home'))
