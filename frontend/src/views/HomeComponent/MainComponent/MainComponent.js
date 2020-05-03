import React from 'react';
import Styles from './Styles';
import { ConversationsListComponent } from './ConversationsListComponent/ConversationsListComponent';
import { ConversationComponent } from './ConversationComponent/ConversationComponent';


export class MainComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {}
	}

	render() {
		return (<div style={Styles.container}>
			<ConversationsListComponent></ConversationsListComponent>
			<ConversationComponent></ConversationComponent>
		</div>)
	}
}