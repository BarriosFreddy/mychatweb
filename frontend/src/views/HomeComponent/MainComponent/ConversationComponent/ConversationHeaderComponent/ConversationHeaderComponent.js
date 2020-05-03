import React from 'react';
import Styles from './Styles';


export class ConversationHeaderComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {}
	}

	render() {
		return (<div style={Styles.container}>
			<p>Conversation name</p>
		</div>)
	}
}