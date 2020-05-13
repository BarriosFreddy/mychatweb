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
		super(props)
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
			username: '',
			password: '',
			loginFailed: false,
			disable: false
		};
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
				if (user && user.data) {
					localStorage.setItem(Constants.USER_TOKEN, JSON.stringify(user.data._id));
					localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(user.data));
					this.clearForm()
					this.setState({ loginFailed: false, disable: false });
					history.push("/");
				} else {
					this.setState({ loginFailed: true, disable: false });
				}
			}).catch(error => {
				console.log(error);
				this.setState({ loginFailed: true, disable: false });
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
						<Form.Control type="text" placeholder="Username"
							value={this.state.username}
							onChange={this.handleChangeUsername} />
					</Form.Group>
					<Form.Group controlId="formHorizontalPassword">
						<Form.Control type="password" placeholder="Password"
							value={this.state.password}
							onChange={this.handleChangePassword} />
					</Form.Group>
					{this.state.loginFailed && <Form.Group style={Styles.rememberme} controlId="formBasicCheckbox">
						<Form.Text>Username or password are incorrect</Form.Text>
					</Form.Group>}
					<Button style={Styles.buttonLogin} block variant="primary"
						disabled={this.state.disable}
						onClick={this.handleSubmit}
						type="submit">
						LOGIN
  					</Button>
					<Link to="/register">
						<Button style={Styles.buttonRegister} block variant="primary">
							SIGN UP
  					</Button>
					</Link>

				</Form>
			</div>
		</div>)
	}
}