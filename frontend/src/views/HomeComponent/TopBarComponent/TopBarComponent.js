import React from 'react';
import Styles from './Styles';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Overlay from 'react-bootstrap/Overlay';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from "react-icons/md";

import UserService from './../../../services/UserService';
import ConversationService from './../../../services/ConversationService';

import ConversationType from '../../../constants/ConversationType';



export class TopBarComponent extends React.Component {
	constructor(props) {
		super(props)
		this.resolveUsersResults = this.resolveUsersResults.bind(this);
		this.resolveGroupsResults = this.resolveGroupsResults.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.handleClickSearch = this.handleClickSearch.bind(this);
		this.handleClickRecord = this.handleClickRecord.bind(this);
		this.handleClose = this.handleClose.bind(this);

		const currentUser = UserService.getCurrentUser();
		this.state = {
			search: '',
			usersList: [],
			groupsList: [],
			currentUser,
			show: false,
		}
		this.target = React.createRef();
	}

	handleChangeSearch(event) {
		const search = event.target.value;
		this.setState({ search });
		this.handleClickSearch(search);
	}

	handleClickSearch(search) {
		this.setState({ usersList: [] });
		if (search) {
			this.findByUsername(search);
			this.findGroupsByName(search);
		} else {
			this.listUsers();
			this.listGroups();
		}
	}

	findByUsername = (search) => UserService.findByUsername(search)
		.then(this.resolveUsersResults).catch(this.catchError);

	listUsers = () => UserService.findAll()
		.then(this.resolveUsersResults).catch(this.catchError);

	findGroupsByName = (search) => ConversationService.findByTypeAndName(ConversationType.GROUPAL, search)
		.then(this.resolveGroupsResults).catch(this.catchError);

	listGroups = () => ConversationService.findByType(ConversationType.GROUPAL)
		.then(this.resolveGroupsResults).catch(this.catchError);

	resolveUsersResults(usersList) {
		const data = usersList.data.filter(user => user._id !== this.state.currentUser._id);
		this.setState({ usersList: data, show: true });
	}

	resolveGroupsResults = (groupsList) => this.setState({ groupsList: groupsList.data, show: true });


	catchError(error) {
		this.setState({ show: false });
		console.log(error);
	}

	handleClickRecord(user) {
		this.setState({ show: false, search: '' });
		this.props.onClickSearch(user);
	}

	handleClose() {
		this.setState({ show: false });
	}
	
	render() {
		return (<div style={Styles.container}>
			<div style={Styles.leftSide}><i style={Styles.logo}>My Chat Web</i></div>
			<div style={Styles.rightSide}>
				<InputGroup style={Styles.search}>
					<Overlay target={this.target.current} show={this.state.show} placement="bottom">
						{({
							placement,
							scheduleUpdate,
							arrowProps,
							outOfBoundaries,
							show: _show,
							...props
						}) => (
								<div
									{...props}
									style={{
										...Styles.searchOverlay,
										...props.style,
									}}
								>
									<div style={Styles.closeSection}>
										<MdClose onClick={this.handleClose} style={Styles.buttonClose} />
									</div>
									<div style={Styles.searchContentOverlay}>
										<p style={{ fontWeight: 'bold' }}>Users</p>
										<ListGroup>
											{this.state.usersList.length === 0 && <ListGroup.Item key={1}
												style={Styles.item}
												onClick={() => { }}
											>No records</ListGroup.Item>}
											{this.state.usersList.map(user =>
												<ListGroup.Item key={user._id}
													style={Styles.item}
													onClick={() => this.handleClickRecord(user)}
												>{user.username}</ListGroup.Item>
											)}
										</ListGroup>
										<p style={{ fontWeight: 'bold' }}>Groups</p>
										<ListGroup >
											{this.state.groupsList.length === 0 && <ListGroup.Item key={1}
												style={Styles.item}
												onClick={() => { }}
											>No records</ListGroup.Item>}
											{this.state.groupsList.map(group =>
												<ListGroup.Item key={group._id}
													style={Styles.item}
													onClick={() => this.handleClickRecord(group)}
												>{group.name}</ListGroup.Item>
											)}
										</ListGroup>
									</div>
								</div>
							)}
					</Overlay>
					<FormControl
						ref={this.target}
						size="sm"
						placeholder="Search"
						type="search"
						style={Styles.searchInput}
						value={this.state.search}
						onChange={this.handleChangeSearch}
						onFocus={this.handleChangeSearch}
					/>
					<InputGroup.Append>
						<Button variant="light"
							style={Styles.searchButton}
							size='sm'
							onClick={this.handleClickSearch}>
							<FaSearch style={Styles.buttonIcon} />
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>
		</div>)
	}
}