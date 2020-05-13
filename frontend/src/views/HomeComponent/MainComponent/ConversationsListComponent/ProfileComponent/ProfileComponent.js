import React from 'react';
import Styles from './Styles';

import Overlay from 'react-bootstrap/Overlay';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdClose } from "react-icons/md";
import UserService from '../../../../../services/UserService';
import FileService from '../../../../../services/FileService';
import Constants from '../../../../../constants/Constants';
import history from './../../../../../history';

const userImage = require('../../../../../assets/images/user.png');


export class ProfileComponent extends React.Component {

	constructor(props) {
		super(props)
		this.close = this.close.bind(this);
		this.show = this.show.bind(this);
		this.handleUploadImage = this.handleUploadImage.bind(this);
		this.onCLickChangeImage = this.onCLickChangeImage.bind(this);
		this.handleCLickLogout = this.handleCLickLogout.bind(this);

		const currentUser = UserService.getCurrentUser();
		this.state = {
			currentUser,
			show: false,
			file: null
		}

		this.target = React.createRef();
		this.fileInput = React.createRef();
	}

	componentDidMount() {
		this.getProfileImage();
	}

	getProfileImage() {
		const { imageUrl } = this.state.currentUser;
		if (imageUrl) {
			FileService.getFileURL(imageUrl).then(url => {
				this.setState({ file: url });
			}).catch(error => { });
		}
	}

	storeFile(fileName, file) {
		if (fileName && file) {
			FileService.upload(fileName, file).then((snapshot) => {
				if (snapshot) {
					const { currentUser } = this.state;
					currentUser.imageUrl = fileName;
					UserService.update(currentUser._id, currentUser).then(response => {
						if (response.data) {
							localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(response.data));
						}
						console.log(response)
					}).catch(error => console.log(error));
				}
			});
		}
	}

	handleUploadImage(e) {
		const file = e.target.files[0];
		this.setState({ file: URL.createObjectURL(file) });
		this.storeFile(file.name, file);
	}

	onCLickChangeImage() {
		this.fileInput.current.click()
	}

	close() {
		this.setState({ show: false });
	}

	show() {
		this.setState({ show: true });
	}

	handleCLickLogout() {
		localStorage.removeItem(Constants.USER_TOKEN);
		localStorage.removeItem(Constants.CURRENT_USER);
		history.push("/");
	}

	render() {
		return (<div style={Styles.container}>
			<ListGroup variant="flush">
				<ListGroup.Item key={this.state.currentUser._id}
					ref={this.target}
					style={Styles.currentUser}
					onClick={this.show}
				>{this.state.currentUser.username}</ListGroup.Item>
			</ListGroup>

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
								...Styles.overlay,
								...props.style,
							}}
						>
							<div style={Styles.closeSection}>
								<MdClose onClick={this.close} style={Styles.buttonClose} />
							</div>
							<div style={Styles.contentOverlay}>
								<p>Profile</p>
								<Image style={Styles.image} thumbnail
									src={this.state.file ? this.state.file
										: userImage} roundedCircle />
								<input ref={this.fileInput}
									type="file" name="myImage"
									style={{ display: 'none' }}
									onChange={this.handleUploadImage} />
								<Button variant="light"
									onClick={this.onCLickChangeImage}>
									Change image
									</Button>
								<br />
								<Button variant="light"
									onClick={this.handleCLickLogout}>
									Log out
												</Button>
							</div>
						</div>
					)}
			</Overlay>
		</div>
		)
	}
}