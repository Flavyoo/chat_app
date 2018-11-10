/**
 * The Chat page for Chat.Me application.
 *
*/

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client';

const HOST = "http://127.0.0.1";
const PORT = 65432
const ENTER_KEY = 13;

class Chat extends Component {
	state = {
		message: "",
	}

	handleInputChange = (e) => {
		this.setState({message: e.target.value});
	}

	sendMessage = () => {
		const socket = io(`${HOST}:${PORT}/`);
		socket.emit('chat message', this.state.message);
	    return false;
	}

	render() {
		return(
		<div className="chatMeContainer">
		  <div className="chatArea left">
		    <div className="chatArea-header">
		      <p className="chatMe-header">Chat.Me</p>
		    </div>
		  </div>
		  <div className="contactArea right">
		  <div id="messageInput">
		    <div className="input-group mb-2">
			  <div className="input-group-prepend">
		        <span
					className="input-group-text"
					id="inputGroup-sizing-default"
					onClick={this.sendMessage}
					>
					Send
				</span>
			    <input
					type="text"
					id="m"
					onChange={(e) => {this.handleInputChange(e)}}
					placeholder="Send a message..."
					className="form-control"
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-default"/>
			  </div>
		    </div>
	      </div>
	     </div>
	   </div>
	)
  }
}

const element = <Chat />
ReactDOM.render(element, document.getElementById('Chat'))
