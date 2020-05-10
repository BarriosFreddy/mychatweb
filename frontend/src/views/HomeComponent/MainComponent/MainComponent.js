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
		this.handleClickConversation = this.handleClickConversation.bind(this);
		const currentUser = UserService.getCurrentUser();
		this.state = {
			selectedConversation: null,
			currentUser
		}
	}

	componentWillMount() {
	}

	componentWillReceiveProps(props) {
		if (props.selectedConversation) {
			const { selectedConversation } = props;
			if (selectedConversation.type && selectedConversation.type === ConversationType.GROUPAL) {
				this.setState({ selectedConversation });
			} else {
				this.savePersonalConversation(selectedConversation);
			}
		}
	}

	savePersonalConversation(selectedUser) {
		if (selectedUser) {
			const membersArray = [this.state.currentUser._id, selectedUser._id];
			const members = membersArray.join(',');
			ConversationService.findPersonalConversation(members).then(response => {
				if (response.data && response.data[0]) {
					this.setState({ selectedConversation: response.data[0] });
				} else {
					const personalConversation = {};
					personalConversation.type = ConversationType.PERSONAL;
					personalConversation.members = membersArray;
					ConversationService.save(personalConversation).then(response => {
						if (response.data) {
							this.setState({ selectedConversation: response.data });
						}
					}).catch(error => {
						console.log(error);
					});
				}
			}).catch(error => {
				console.log(error);
			});


		}

	}

	handleClickConversation(selectedConversation) {
		this.setState({ selectedConversation });
	}


	render() {
		return (<div style={Styles.container}>
			<ConversationsListComponent
				selectedConversation={this.state.selectedConversation}
				onClickConversation={this.handleClickConversation}></ConversationsListComponent>
			<ConversationComponent selectedConversation={this.state.selectedConversation} ></ConversationComponent>
		</div>)
	}
}