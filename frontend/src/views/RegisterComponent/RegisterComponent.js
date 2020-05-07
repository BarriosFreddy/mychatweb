import React from 'react';
import Styles from './Styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';

export class RegisterComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {
			username: '',
			password: '',
			success: false,
			disable: false,
			usernameTaken: false
		};

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeUsername(event) {
		this.setState({ username: event.target.value });
	}

	handleChangePassword(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.validateForm()) {
			this.setState({ usernameTaken: false, disable: true });
			UserService.save(this.getUser()).then(user => {
				if (user) {
					this.clearForm()
					this.setState({ success: true, disable: false });
				}
			}).catch(error => {
				console.log(error);
				this.setState({ success: false, disable: false });
				this.setState({ usernameTaken: true });
			});
		}
	}

	validateForm() {
		return this.state.username && this.state.password &&
			this.state.username.length > 3 && this.state.password.length > 6;
	}

	getUser() {
		const { username, password } = this.state;
		return { username, password };
	}

	clearForm() {
		this.setState({ username: '', password: '' });
	}

	render() {
		return (<div style={Styles.container}>
			<div style={Styles.logoContainer}>
				<i style={Styles.logo}>My Chat Web</i>
			</div>
			<div style={Styles.formContainer}>
				<Form>
					<Form.Group controlId="formHorizontalUsername">
						<Form.Label style={Styles.legend}>Username</Form.Label>
						{this.state.usernameTaken &&
							<Form.Text style={Styles.recommendations} >&nbsp;&nbsp;&nbsp;This Username has been taken already</Form.Text>}
						<Form.Control type="text" placeholder="Username"
							value={this.state.username}
							onChange={this.handleChangeUsername} />
					</Form.Group>
					<Form.Group controlId="formHorizontalPassword">
						<Form.Label style={Styles.legend} >Password</Form.Label>
						<Form.Control type="password" placeholder="Password"
							value={this.state.password}
							onChange={this.handleChangePassword} />
						<Form.Text ></Form.Text>
					</Form.Group>
					{!this.state.success && <Form.Group>
						<Form.Text style={Styles.recommendations} >Username must be greater than 3 characters<br />Password must be greater than 6 characters.</Form.Text>
					</Form.Group>}
					{this.state.success &&
						<Form.Group>
							<Form.Text style={Styles.legend} >You have signed up successfully, please <Link to="/login">Log in</Link></Form.Text>
						</Form.Group>}
					<Button style={Styles.buttonRegister} block variant="primary"
						disabled={this.state.disable}
						onClick={this.handleSubmit}>
						SIGN UP
  					</Button>
				</Form>
			</div>
		</div>)
	}
}