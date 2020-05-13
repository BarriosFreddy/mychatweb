import React from 'react';
import Styles from './Styles';
import { MessagesListComponent } from './MessagesListComponent/MessagesListComponent';
import { MessageFormComponent } from './MessageForm/MessageForm';
import { ConversationHeaderComponent } from './ConversationHeaderComponent/ConversationHeaderComponent';
import socketIOClient from "socket.io-client";
import Constants from '../../../../constants/Constants';
import ConversationService from '../../../../services/ConversationService';
import UserService from '../../../../services/UserService';


export class ConversationComponent extends React.Component {
	constructor(props) {
		super(props)

		this.sendMessage = this.sendMessage.bind(this);
		this.updateCurrentConversation = this.updateCurrentConversation.bind(this);

		const currentUser = UserService.getCurrentUser();
		this.state = {
			messages: [],
			conversationId: null,
			currentUser
		}
		this.socket = socketIOClient(Constants.API);
	}

	componentWillMount() {
	}

	componentWillReceiveProps(props) {
		if (props.selectedConversation) {
			const { selectedConversation } = props;
			const conversationId = selectedConversation._id;

			this.setState({
				messages: selectedConversation.messages,
				conversationId,
				selectedConversation
			});

			this.socket.emit('joinMe', conversationId);
			this.socket.on('messages', data => {
				const { messages } = this.state;
				const messageInList = messages.filter(message => message._id === data._id);
				if (messageInList.length === 0) {
					messages.push(data);
					this.setState({
						messages
					});
					this.updateCurrentConversation(conversationId);
				}
			});
		}
	}


	sendMessage(message) {
		if (this.state.selectedConversation && message) {
			const { selectedConversation, conversationId } = this.state;

			const messageToSave = {
				author: this.state.currentUser._id,
				message,
			}
			selectedConversation.messages.push(messageToSave);
			this.saveMessage(conversationId, selectedConversation);
		}
	}

	saveMessage(conversationId, conversation) {
		ConversationService.update(conversationId, conversation)
			.then(response => {
				const updatedConversation = response.data;
				if (updatedConversation) {
					const { messages } = updatedConversation;
					const lastMessage = messages[messages.length - 1];
					this.socket.emit('messages', lastMessage);
					this.updateCurrentConversation(conversationId);
				}
			}).catch(error => console.error(error));
	}

	updateCurrentConversation(conversationId) {
		ConversationService.findById(conversationId)
			.then(response => {
				const conversation = response.data;
				if (conversation) {
					this.setState({
						selectedConversation: conversation,
						messages: conversation.messages
					});
				}
			}).catch(error => console.error(error));
	}

	render() {
		return (<div style={Styles.container}>
			{!this.props.selectedConversation && <div style={Styles.welcome}>Welcome, {this.state.currentUser.username}</div>}
			{this.props.selectedConversation &&
				<div>
					<ConversationHeaderComponent selectedConversation={this.props.selectedConversation}></ConversationHeaderComponent>
					<MessagesListComponent messages={this.state.messages} ></MessagesListComponent>
					<MessageFormComponent sendMessage={this.sendMessage} ></MessageFormComponent>
				</div>}
		</div>)
	}
}