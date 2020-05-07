import React from 'react';
import Styles from './Styles';
import ListGroup from 'react-bootstrap/ListGroup';
import UserService from './../../../../services/UserService';
import ConversationService from './../../../../services/ConversationService';

export class ConversationsListComponent extends React.Component {
	constructor(props) {
		super()
		this.handleClickUser = this.handleClickUser.bind(this);
		this.handleClickGroup = this.handleClickGroup.bind(this);
		this.state = {
			listUsers: [],
			listGroups: []
		}
	}

	componentWillMount() {
		this.listUsers();
		this.listGroups();
	}

	listUsers() {
		UserService.findAll().then(listUsers => {
			const { data } = listUsers;
			this.setState({ listUsers: data })
			console.log(data)
		}).catch(error => {
			console.log(error);
		});
	}

	listGroups() {
		ConversationService.findByType('G').then(listGroups => {
			const { data } = listGroups;
			this.setState({ listGroups: data })
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
					{this.state.listUsers.map(user =>
						<ListGroup.Item key={user._id}
							style={{ background: 'transparent', cursor: 'pointer' }}
							onClick={() => this.handleClickUser(user)}
						>{user.username}</ListGroup.Item>
					)}
				</ListGroup>
			</div>
			<div style={{ height: '40vh', overflow: 'auto' }}>
				<ListGroup.Item style={{ background: 'transparent', fontWeight: 'bold' }}>Groups</ListGroup.Item>
				<ListGroup variant="flush">
					{this.state.listGroups.map(group =>
						<ListGroup.Item key={group._id} 
						style={{ background: 'transparent', cursor: 'pointer' }}
						onClick={() => this.handleClickGroup(group)}>{group.name}</ListGroup.Item>
					)}
				</ListGroup>
			</div>
		</div>)
	}
}