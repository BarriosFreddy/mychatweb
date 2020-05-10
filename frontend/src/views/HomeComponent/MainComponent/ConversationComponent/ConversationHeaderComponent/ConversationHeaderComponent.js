import React from 'react';
import Styles from './Styles';
import ConversationType from '../../../../../constants/ConversationType';
import UserService from '../../../../../services/UserService';


export class ConversationHeaderComponent extends React.Component {
	constructor(props) {
		super(props)
		this.getConversationName = this.getConversationName.bind(this);
		const currentUser = UserService.getCurrentUser();
		this.state = {
			currentUser
		}
	}

	getConversationName() {
		if (this.props.selectedConversation) {
			if (this.props.selectedConversation.type === ConversationType.GROUPAL) {
				return this.props.selectedConversation.name;
			} else if (this.props.selectedConversation.type === ConversationType.PERSONAL) {
				return this.getUsernamePairMember(this.props.selectedConversation.members);
			}
		}
		return null;
	}

	getUsernamePairMember(members) {
		const pairMember = members.filter(member => member._id !== this.state.currentUser._id);
		return pairMember ? pairMember[0].username : 'Anonymous';
	}

	render() {
		return (<div style={Styles.container}>
			<p style={Styles.conversationName} >{this.getConversationName()}</p>
		</div>)
	}
}