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

const userImage = require('../../../../../assets/images/user.png');
const PREFIX_BASE64 = 'data:image/jpeg;base64,';

export class ProfileComponent extends React.Component {

	constructor(props) {
		super(props)
		this.close = this.close.bind(this);
		this.show = this.show.bind(this);
		this.handleUploadImage = this.handleUploadImage.bind(this);
		this.onCLickChangeImage = this.onCLickChangeImage.bind(this);


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
		const { imageUrl } = this.state.currentUser;
		FileService.image(imageUrl).then(response => {
			if (response.data) {
				const imageAsBase64 = PREFIX_BASE64 + response.data;
				this.setState({ file: imageAsBase64 });
			}
		}).catch(error => console.error(error));
	}

	handleUploadImage(e) {
		const file = e.target.files[0];
		console.log(e.target);
		this.setState({ file: URL.createObjectURL(file) });

		const formData = new FormData();
		formData.append('image', file);

		FileService.upload(formData).then(response => {
			console.log("Image Uploaded", response);
			const { data } = response;
			if (data && data.image) {
				const { name } = data.image;
				const { currentUser } = this.state;
				currentUser.imageUrl = name;
				UserService.update(currentUser._id, currentUser).then(response => {
					console.log(response)
				}).catch(error => console.log(error));
			}
		}).catch(error => console.error(error));

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
								<Container fluid>
									<Row>
										<Col md={12}>
											<Image style={Styles.image} thumbnail
												src={this.state.file ? this.state.file
													: userImage} roundedCircle />
										</Col>
									</Row>
									<br />
									<Row>
										<Col md={{ span: 11, offset: 1 }}>
											<input ref={this.fileInput}
												type="file" name="myImage"
												style={{ display: 'none' }}
												onChange={this.handleUploadImage} />
											<Button variant="light"
												onClick={this.onCLickChangeImage}>
												Change image</Button>
										</Col>
									</Row>
								</Container>
							</div>
						</div>
					)}
			</Overlay>
		</div>
		)
	}
}