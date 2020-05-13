import React from 'react';
import Styles from './Styles';
import { MessagesLogComponent } from './MessageLogComponent/MessageLogComponent';
import UserService from '../../../../../services/UserService';


export class MessagesListComponent extends React.Component {
	constructor(props) {
		super(props)
		this.orderMessage = this.orderMessage.bind(this);
		const currentUser = UserService.getCurrentUser();
		this.state = {
			currentUser
		}
	}

	orderMessage() {
		return this.props.messages.sort((message1, message2) => {
			if (new Date(message1.createdAt) > new Date(message2.createdAt))
				return -1;
			if (new Date(message1.createdAt) < new Date(message2.createdAt))
				return 1;
			return 0;
		});
	}

	render() {
		return (<div style={Styles.container}>
			{this.orderMessage().map((message, index) => {
				return <MessagesLogComponent key={index}
					isAuthor={message.author === this.state.currentUser._id}
					message={message.message} />
			})
			}

		</div>)
	}
}