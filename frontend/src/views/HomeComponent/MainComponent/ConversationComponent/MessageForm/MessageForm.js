import React from 'react';
import Styles from './Styles';

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


export class MessageFormComponent extends React.Component {
	constructor(props) {
		super()
		this.sendMessage = this.sendMessage.bind(this);
		this.handleChangeMessage = this.handleChangeMessage.bind(this);
		this.handleKeyPressMessage = this.handleKeyPressMessage.bind(this);
		this.state = {
			message: ''
		}
	}

	componentWillMount() {
	}

	handleChangeMessage(event) {
		this.setState({ message: event.target.value });
	}

	handleKeyPressMessage(event) {
		if (event.key === "Enter") {
			this.sendMessage();
		}
	}

	sendMessage() {
		if (this.state.message && this.state.message.length > 0) {
			this.props.sendMessage(this.state.message);
			this.setState({ message: '' })
		}
	}

	render() {
		return (<div style={Styles.container}>
			<InputGroup >
				<FormControl
					type="text"
					placeholder="Type a message"
					value={this.state.message}
					onChange={this.handleChangeMessage}
					onKeyPress={this.handleKeyPressMessage}
				/>
				<InputGroup.Append>
					<Button type='submit' variant="outline-secondary"
						onClick={this.sendMessage}
					>Send</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>)
	}
}