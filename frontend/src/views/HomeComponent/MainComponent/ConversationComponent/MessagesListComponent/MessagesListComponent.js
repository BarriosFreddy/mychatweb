import React from 'react';
import Styles from './Styles';


export class MessagesListComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {
		}
	}

	render() {
		return (<div style={Styles.container}>
			{this.props.messages.map((message, index) => <div key={index}>{message.message}</div>)}
		</div>)
	}
}