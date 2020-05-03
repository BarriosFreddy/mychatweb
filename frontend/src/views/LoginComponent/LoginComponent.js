import React from 'react';
import Styles from './Styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class LoginComponent extends React.Component {
	constructor(props) {
		super()
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (<div style={Styles.container}>
			<div style={Styles.logoContainer}>
				<i style={Styles.logo}>My Chat Web</i>
			</div>
			<div style={Styles.formContainer}>
				<Form>
					<Form.Group controlId="formHorizontalEmail">
						<Form.Control type="email" placeholder="Username" />
					</Form.Group>
					<Form.Group controlId="formHorizontalEmail">
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group style={Styles.rememberme} controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Remember me" />
					</Form.Group>
					<Button style={Styles.buttonLogin} block variant="primary" type="submit">
						LOGIN
  					</Button>
					<Link to="/register">
						<Button style={Styles.buttonRegister} block variant="primary" type="submit">
							REGISTER
  					</Button>
					</Link>

				</Form>
			</div>
		</div>)
	}
}