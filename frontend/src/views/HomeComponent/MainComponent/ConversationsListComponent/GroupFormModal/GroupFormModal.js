import React from 'react';
import Styles from './Styles';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import UserService from './../../../../../services/UserService';

export class GroupFormModal extends React.Component {
	constructor(props) {
		super(props)
		this.handleChangeGroupname = this.handleChangeGroupname.bind(this);
		this.handleClickUserSearch = this.handleClickUserSearch.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.resolveResults = this.resolveResults.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getGroupData = this.getGroupData.bind(this);

		const currentUser = UserService.getCurrentUser();
		this.state = {
			showModal: true,
			groupname: '',
			usersListSearch: [],
			selectedUsersList: [],
			currentUser,
			nameValid: true,
			userslistValid: true
		}
	}

	componentDidMount() {
		this.listUsersSearch();
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

	handleClickUserSearch(user) {
		const { selectedUsersList } = this.state;
		const userInListArray = selectedUsersList.filter(userInList => userInList._id === user._id);
		if (userInListArray.length === 0) {
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

	findByUsername(search) {
		UserService.findByUsername(search).then(this.resolveResults).catch(this.catchError);
	}

	listUsersSearch() {
		UserService.findAll().then(this.resolveResults).catch(this.catchError);
	}

	resolveResults(usersListSearch) {
		const data = usersListSearch.data.filter(user => user._id !== this.state.currentUser._id);
		data.forEach(user => {
			const userInListArray = this.state.selectedUsersList.filter(userInList => userInList._id === user._id);
			if (userInListArray.length !== 0) {
				user.selected = true;
			}
		});
		this.setState({ usersListSearch: data, show: true });
	}

	catchError(error) {
		console.log(error);
	}

	handleSubmit() {
		if (this.isFormValid()) {
			this.props.save(this.getGroupData())
		}
	}

	isFormValid() {
		const { groupname, selectedUsersList } = this.state;
		const nameValid = groupname && groupname.length > 0;
		const usersListValid = selectedUsersList && selectedUsersList.length > 0;
		this.setState({
			nameValid,
			usersListValid
		});

		return nameValid && usersListValid;
	}

	getGroupData() {
		return {
			name: this.state.groupname,
			members: this.state.selectedUsersList
		}
	}

	render() {
		return (
			<Modal show={this.state.showModal}
				backdrop='static'
				onHide={this.props.closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Create a group</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control type="text" placeholder="Name"
						required
						size="sm"
						value={this.state.groupname}
						onChange={this.handleChangeGroupname} />
					{!this.state.nameValid && <div style={Styles.invalid}>
						Name is required
            		</div>}
					<p style={{ fontWeight: 'bold' }}>Selected users</p>
					<ul>
						{this.state.selectedUsersList &&
							this.state.selectedUsersList.map(user => <li key={user._id}>{user.username}</li>)}
					</ul>
					{!this.state.nameValid && <div style={Styles.invalid}>
						Add at least one user
            		</div>}
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
					<Button variant="primary" onClick={this.handleSubmit}>
						Save
          				</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}