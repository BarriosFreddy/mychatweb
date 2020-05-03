import React from 'react';
import Styles from './Styles';


export class ConversationsListComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {}
	}

	render() {
		return (<div style={Styles.container}>
			<p>Conversations list</p>
		</div>)
	}
}