import React from 'react';
import Styles from './Styles';

import Overlay from 'react-bootstrap/Overlay';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdClose } from "react-icons/md";
import UserService from '../../../../../services/UserService';
import FileService from '../../../../../services/FileService';
import Constants from '../../../../../constants/Constants';
import history from './../../../../../history';
import * as firebase from "firebase";

const userImage = require('../../../../../assets/images/user.png');
const PREFIX_BASE64 = 'data:image/jpeg;base64,';

const firebaseConfig = {
	apiKey: "AIzaSyAB_5uta9tzQNwssN6uIEtPsnQgf54N-Bc",
	authDomain: "mychatweb-15808.firebaseapp.com",
	databaseURL: "https://mychatweb-15808.firebaseio.com",
	projectId: "mychatweb-15808",
	storageBucket: "mychatweb-15808.appspot.com",
	messagingSenderId: "653032904442",
	appId: "1:653032904442:web:6a4d1240635977e12a9b43",
	measurementId: "G-0WHYPW361N"
};

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


	componentWillMount() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
			firebase.analytics();
		}
	}

	componentDidMount() {
		this.getProfileImage();
	}

	getProfileImage() {
		const { imageUrl } = this.state.currentUser;
		if (imageUrl) {
			const fileRef = firebase.storage().ref(imageUrl);
			fileRef.getDownloadURL().then(url => {
				this.setState({ file: url });
			}).catch(error => { });
		}
	}

	storeFile(fileName, file) {
		if (fileName && file) {
			const fileRef = firebase.storage().ref().child(fileName);
			fileRef.put(file).then((snapshot) => {
				if (snapshot) {
					const { currentUser } = this.state;
					currentUser.imageUrl = fileName;
					UserService.update(currentUser._id, currentUser).then(response => {
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
		console.log(this.fileInput)

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