import React from 'react';
import Styles from './Styles';

import ListGroup from 'react-bootstrap/ListGroup';

import UserService from './../../../../services/UserService';
import ConversationService from './../../../../services/ConversationService';


const GROUP_TYPE = 'G';

export class ConversationsListComponent extends React.Component {
	constructor(props) {
		super()
		this.handleClickUser = this.handleClickUser.bind(this);
		this.handleClickGroup = this.handleClickGroup.bind(this);
		this.state = {
			search: '',
			usersList: [],
			groupsList: [],
			currentUser: null,
			searchDisabled: false
		}
	}

	componentWillMount() {
		this.listUsers();
		this.listGroups();
		this.getCurrentUser();
	}

	getCurrentUser() {
		const currentUser = UserService.getCurrentUser();
		this.setState({ currentUser });
	}

	listUsers() {
		UserService.findAll().then(usersList => {
			const data = usersList.data.filter(user => user._id !== this.state.currentUser._id);
			this.setState({ usersList: data });
			this.setState({ searchDisabled: false });
		}).catch(error => {
			this.setState({ searchDisabled: false });
			console.log(error);
		});
	}

	listGroups() {
		ConversationService.findByType(GROUP_TYPE).then(groupsList => {
			const { data } = groupsList;
			this.setState({ groupsList: data });
		}).catch(error => {
			console.log(error);
		});
	}

	handleClickUser(user) {
		console.log(user);
	}

	handleClickGroup(group) {
		console.log(group);
	}

	render() {
		return (<div style={Styles.container}>
			<div style={{ height: '55vh', overflow: 'auto' }}>
				<ListGroup variant="flush">
					<ListGroup.Item key={this.state.currentUser._id}
						style={Styles.currentUser}
						onClick={() => { }}
					>{this.state.currentUser.username}</ListGroup.Item>
				</ListGroup>
				<ListGroup variant="flush">
					{this.state.usersList.map(user =>
						<ListGroup.Item key={user._id}
							style={Styles.item}
							onClick={() => this.handleClickUser(user)}
						>{user.username}</ListGroup.Item>
					)}
				</ListGroup>
			</div>
			<div style={{ height: '40vh', overflow: 'auto' }}>
				<ListGroup.Item style={Styles.headerItem}>Groups</ListGroup.Item>
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