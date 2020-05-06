import React from 'react';
import Styles from './Styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AuthenticationService from '../../services/AuthenticationService';
import history from './../../history';
import Constants from './../../constants/Constants';
export class LoginComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {
			username: '',
			password: '',
			success: false,
			disable: false
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
			this.setState({ disable: true });
			AuthenticationService.login(this.getUser()).then(user => {
				if (user) {
					localStorage.setItem(Constants.USER_TOKEN, JSON.stringify(user.data))
					this.clearForm()
					this.setState({ success: true, disable: false });
					history.push("/");
				}
			}).catch(error => console.log(error));
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
						<Form.Control type="text" placeholder="Username"
							value={this.state.username}
							onChange={this.handleChangeUsername} />
					</Form.Group>
					<Form.Group controlId="formHorizontalPassword">
						<Form.Control type="password" placeholder="Password"
							value={this.state.password}
							onChange={this.handleChangePassword} />
					</Form.Group>
					<Form.Group style={Styles.rememberme} controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Remember me" />
					</Form.Group>
					<Button style={Styles.buttonLogin} block variant="primary"
						disabled={this.state.disable}
						onClick={this.handleSubmit}>
						LOGIN
  					</Button>
					<Link to="/register">
						<Button style={Styles.buttonRegister} block variant="primary" type="submit">
							SIGN UP
  					</Button>
					</Link>

				</Form>
			</div>
		</div>)
	}
}