import React from 'react';
import Styles from './Styles';
import { ConversationsListComponent } from './ConversationsListComponent/ConversationsListComponent';
import { ConversationComponent } from './ConversationComponent/ConversationComponent';
import ConversationType from '../../../constants/ConversationType';
import ConversationService from '../../../services/ConversationService';
import UserService from '../../../services/UserService';


export class MainComponent extends React.Component {
	constructor(props) {
		super(props)
		this.handleSelectedGroup = this.handleSelectedGroup.bind(this);

		const currentUser = UserService.getCurrentUser();
		this.state = {
			selectedConversation: null,
			currentUser,
			personalConversationSaved: false
		}
	}

	componentWillMount() {
	}

	componentWillReceiveProps(props) {
		if (props.selectedUser) {
			const { selectedUser } = props;
			console.log('selectedUser', selectedUser);
			this.savePersonalConversation(selectedUser);
		}
	}

	savePersonalConversation(selectedUser) {
		if (selectedUser) {
			const personalConversation = {};
			personalConversation.type = ConversationType.PERSONAL;
			personalConversation.members = [this.state.currentUser._id, selectedUser._id];
			ConversationService.save(personalConversation).then(response => {
				if (response.data) {
					this.setState({ selectedConversation: response.data });
				}
			}).catch(error => {
				console.log(error);
			});
		}

	}

	handleSelectedGroup(group) {
		this.setState({ selectedConversation: group });
	}


	render() {
		return (<div style={Styles.container}>
			<ConversationsListComponent
				personalConversationSaved={this.state.personalConversationSaved}
				selectedGroup={this.handleSelectedGroup}></ConversationsListComponent>
			<ConversationComponent selectedConversation={this.state.selectedConversation} ></ConversationComponent>
		</div>)
	}
}