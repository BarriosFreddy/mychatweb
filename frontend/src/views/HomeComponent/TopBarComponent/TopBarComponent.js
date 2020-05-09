import React from 'react';
import Styles from './Styles';
import './top-bar-component.style.css';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaSearch } from 'react-icons/fa';

import UserService from './../../../services/UserService';


export class TopBarComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {
			search: '',
			usersList: [],
			currentUser: null,
			show: false,
		}
		this.target = React.createRef();

		this.resolveResults = this.resolveResults.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.handleClickSearch = this.handleClickSearch.bind(this);

	}

	componentWillMount() {
		this.getCurrentUser();
	}

	getCurrentUser() {
		const currentUser = UserService.getCurrentUser();
		this.setState({ currentUser });
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
		} else {
			this.listUsers();
		}

	}

	findByUsername(search) {
		UserService.findByUsername(search).then(this.resolveResults).catch(this.catchError);
	}

	listUsers() {
		UserService.findAll().then(this.resolveResults).catch(this.catchError);
	}

	resolveResults(usersList) {
		const data = usersList.data.filter(user => user._id !== this.state.currentUser._id);
		this.setState({ usersList: data, show: true });
	}

	catchError(error) {
		this.setState({ show: true });
		console.log(error);
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
									<ListGroup variant="flush">
										{this.state.usersList.length === 0 && <ListGroup.Item key={1}
											style={Styles.item}
											onClick={() => { }}
										>No records</ListGroup.Item>}
										{this.state.usersList.map(user =>
											<ListGroup.Item key={user._id}
												style={Styles.item}
												onClick={() => this.handleClickUser(user)}
											>{user.username}</ListGroup.Item>
										)}
									</ListGroup>
								</div>
							)}
					</Overlay>
					{/* disabled={this.state.searchDisabled} */}
					<FormControl
						ref={this.target}
						size="sm"
						placeholder="Search"
						type="search"
						style={Styles.searchInput}
						value={this.state.search}
						onChange={this.handleChangeSearch}
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