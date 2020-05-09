import React from 'react';
import Styles from './Styles';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaPlus } from 'react-icons/fa';

import UserService from './../../../../services/UserService';
import ConversationService from './../../../../services/ConversationService';


const GROUP_TYPE = 'G';

export class ConversationsListComponent extends React.Component {
	constructor(props) {
		super()
		this.handleClickUser = this.handleClickUser.bind(this);
		this.handleClickGroup = this.handleClickGroup.bind(this);
		this.handleClickNewGroup = this.handleClickNewGroup.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleChangeGroupname = this.handleChangeGroupname.bind(this);
		this.handleClickUserSearch = this.handleClickUserSearch.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.resolveResults = this.resolveResults.bind(this);

		this.state = {
			search: '',
			usersList: [],
			groupsList: [],
			currentUser: null,
			searchDisabled: false,
			showModal: false,
			groupname: '',
			usersListSearch: [],
			selectedUsersList: [],
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
		}).catch(error => {
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

	handleChangeGroupname(event) {
		this.setState({ groupname: event.target.value });
	}

	handleChangeSearch(event) {
		const search = event.target.value;
		this.setState({ search });
		this.handleClickSearch(search);
	}

	handleClickSearch(search) {
		this.setState({ usersListSearch: [] });
		if (search) {
			this.findByUsername(search);
		} else {
			this.listUsersSearch();
		}

	}

	findByUsername(search) {
		UserService.findByUsername(search).then(this.resolveResults).catch(this.catchError);
	}

	listUsersSearch() {
		UserService.findAll().then(this.resolveResults).catch(this.catchError);
	}

	resolveResults(usersListSearch) {
		const data = usersListSearch.data.filter(user => user._id !== this.state.currentUser._id);
		this.setState({ usersListSearch: data, show: true });
	}

	catchError(error) {
		console.log(error);
	}


	handleClickUserSearch(user) {
		const { selectedUsersList } = this.state;
		console.log(selectedUsersList);
		
		if (!selectedUsersList.includes(user)) {
			user.selected = true;
			selectedUsersList.push(user);
			this.setState({ selectedUsersList });
		} else {
			const index = selectedUsersList.indexOf(user);
			user.selected = false;
			const newSelectedUsersList = selectedUsersList.splice(index, 1);
			this.setState({ selectedUsersList: newSelectedUsersList });
		}

	}

	handleClickUser(user) {
		console.log(user);
	}

	handleClickGroup(group) {
		console.log(group);
	}

	handleClickNewGroup() {
		this.setState({ showModal: true });
		this.listUsersSearch()
	}

	handleCloseModal() {
		this.setState({ showModal: false });
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
				<ListGroup.Item style={Styles.headerItem}>Groups
				<Button variant="light"
						style={Styles.searchButton}
						size='sm'
						onClick={this.handleClickNewGroup}>
						<FaPlus style={Styles.buttonIcon} />
					</Button>
				</ListGroup.Item>
				<Modal show={this.state.showModal} onHide={this.handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Create a group</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Control type="text" placeholder="Name"
							size="sm"
							value={this.state.groupname}
							onChange={this.handleChangeGroupname} />
						<p>Selected users</p>
						<ul>
							{this.state.selectedUsersList &&
								this.state.selectedUsersList.map(user => <li key={user._id}>{user.username}</li>)}
						</ul>
						<Form.Group controlId="formHorizontalUsername">
							<Form.Label>Suggested users</Form.Label>
							<Form.Control
								ref={this.target}
								size="sm"
								placeholder="Search"
								type="search"
								value={this.state.search}
								onChange={this.handleChangeSearch}
							/>
						</Form.Group>
						<ListGroup style={{ maxHeight: '100px', overflow: 'auto' }}>
							{this.state.usersListSearch.length === 0 && <ListGroup.Item key={1}
								style={Styles.item}
								onClick={() => { }}
							>No records</ListGroup.Item>}
							{this.state.usersListSearch.map(user =>
								<ListGroup.Item key={user._id}
									style={Styles.searchItem}
									active={user.selected}
									onClick={() => this.handleClickUserSearch(user)}
								>{user.username}</ListGroup.Item>
							)}
						</ListGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.handleCloseModal}>
							Save
          				</Button>
					</Modal.Footer>
				</Modal>
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