import React from 'react';
import Styles from './Styles';
import { MessagesListComponent } from './MessagesListComponent/MessagesListComponent';
import { MessageFormComponent } from './MessageForm/MessageForm';
import { ConversationHeaderComponent } from './ConversationHeaderComponent/ConversationHeaderComponent';


export class ConversationComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {}
	}

	render() {
		return (<div style={Styles.container}>
			<ConversationHeaderComponent></ConversationHeaderComponent>
			<MessagesListComponent></MessagesListComponent>
			<MessageFormComponent></MessageFormComponent>
		</div>)
	}
}