import React from 'react';
import Styles from './Styles';
import ConversationType from '../../../../../constants/ConversationType';


export class ConversationHeaderComponent extends React.Component {
	constructor(props) {
		super(props)
		this.getConversationName = this.getConversationName.bind(this);
		this.state = {}
	}

	getConversationName() {
		if (this.props.selectedConversation) {
			if (this.props.selectedConversation.type === ConversationType.GROUPAL) {
				return this.props.selectedConversation.name;
			} else if (this.props.selectedConversation.type === ConversationType.PERSONAL) {
				return 'User Nsame';
			}
		}
		return null;
	}

	render() {
		return (<div style={Styles.container}>
			<p style={Styles.conversationName} >{this.getConversationName()}</p>
		</div>)
	}
}