import React from 'react';
import Styles from './Styles';
import { TopBarComponent } from './TopBarComponent/TopBarComponent';
import { MainComponent } from './MainComponent/MainComponent';

export class HomeComponent extends React.Component {
	constructor(props) {
		super()
		this.onClickSearchUser = this.onClickSearchUser.bind(this);
		this.state = {
			selectedUser: null
		}

	}

	onClickSearchUser(selectedUser) {
		this.setState({ selectedUser });
	}

	render() {
		return (<div style={Styles.container}>
			<TopBarComponent onClickSearchUser={this.onClickSearchUser}></TopBarComponent>
			<MainComponent selectedUser={this.state.selectedUser}></MainComponent>
		</div>)
	}
}