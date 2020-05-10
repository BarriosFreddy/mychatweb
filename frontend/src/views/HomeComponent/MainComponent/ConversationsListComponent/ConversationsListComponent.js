import React from 'react';
import Styles from './Styles';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';

import UserService from './../../../../services/UserService';
import ConversationService from './../../../../services/ConversationService';
import ConversationType from '../../../../constants/ConversationType';
import { GroupFormModal } from './GroupFormModal/GroupFormModal';

export class ConversationsListComponent extends React.Component {
	constructor(props) {
		super()
		this.handleClickPersonalConversation = this.handleClickPersonalConversation.bind(this);
		this.handleClickGroup = this.handleClickGroup.bind(this);
		this.handleClickNewGroup = this.handleClickNewGroup.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleSaveGroup = this.handleSaveGroup.bind(this);

		const currentUser = UserService.getCurrentUser();
		this.state = {
			search: '',
			personalsConversationsList: [],
			groupsList: [],
			currentUser,
			searchDisabled: false,
			showModal: false,
		}
	}

	componentWillMount() {
		this.listPersonalsConversations();
		this.listGroupalsConversations();
	}

	componentWillReceiveProps(props) {
		if (props.personalConversationSaved) {
			this.listPersonalsConversations();
		}
	}

	listPersonalsConversations() {
		ConversationService.findByTypeAndMember(ConversationType.PERSONAL, this.state.currentUser._id)
			.then(response => {
				const { data } = response;
				console.log('data', data);
				this.setState({ personalsConversationsList: data });
			}).catch(error => {
				console.log(error);
			});
	}

	listGroupalsConversations() {
		ConversationService.findByTypeAndMember(ConversationType.GROUPAL, this.state.currentUser._id)
			.then(response => {
				const { data } = response;
				this.setState({ groupsList: data });
			}).catch(error => {
				console.log(error);
			});
	}

	handleClickPersonalConversation(conversation) {
		this.props.selectedGroup(conversation);
	}

	handleClickGroup(group) {
		this.props.selectedGroup(group);
	}

	handleClickNewGroup() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	handleSaveGroup(group) {
		console.log(group);
		if (group) {
			group.type = ConversationType.GROUPAL;
			group.members.push(this.state.currentUser._id);
			ConversationService.save(group).then(response => {
				if (response.data) {
					this.listGroupalsConversations();
				}
			}).catch(error => {
				console.log(error);
			});
		}
		this.setState({ showModal: false });
	}

	getUsernamePairMember(members) {
		const pairMember = members.filter(member => member._id !== this.state.currentUser._id);
		return pairMember ? pairMember[0].username : 'Anonymous';
	}

	render() {
		return (<div style={Styles.container}>
			{/* Personal conversations list */}
			<div style={{ height: '55vh', overflow: 'auto' }}>
				<ListGroup variant="flush">
					<ListGroup.Item key={this.state.currentUser._id}
						style={Styles.currentUser}
						onClick={() => { }}
					>{this.state.currentUser.username}</ListGroup.Item>
				</ListGroup>
				<ListGroup variant="flush">
					{this.state.personalsConversationsList.map(conversation =>
						<ListGroup.Item key={conversation._id}
							style={Styles.item}
							onClick={() => this.handleClickPersonalConversation(conversation)}
						>{this.getUsernamePairMember(conversation.members)}</ListGroup.Item>
					)}
				</ListGroup>
			</div>
			{/* Groupal conversations list */}
			<div style={{ height: '40vh', overflow: 'auto' }}>
				<ListGroup.Item style={Styles.headerItem}>Groups
				<Button variant="light"
						style={Styles.searchButton}
						size='sm'
						onClick={this.handleClickNewGroup}>
						<FaPlus style={Styles.buttonIcon} />
					</Button>
				</ListGroup.Item>
				{this.state.showModal && <GroupFormModal
					closeModal={this.handleCloseModal}
					save={this.handleSaveGroup} ></GroupFormModal>}
				<ListGroup variant="flush">
					{this.state.groupsList.map(group =>
						<ListGroup.Item key={group._id}
							style={Styles.item}
							onClick={() => this.handleClickGroup(group)}>{group.name}</ListGroup.Item>
					)}
				</ListGroup>
			</div>
		</div>)
	}
}