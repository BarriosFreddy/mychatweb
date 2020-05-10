import React from 'react';
import Styles from './Styles';
import { TopBarComponent } from './TopBarComponent/TopBarComponent';
import { MainComponent } from './MainComponent/MainComponent';

export class HomeComponent extends React.Component {
	constructor(props) {
		super()
		this.onClickSearch = this.onClickSearch.bind(this);
		this.state = {
			selectedConversation: null
		}

	}

	onClickSearch(selectedConversation) {
		this.setState({ selectedConversation });
	}

	render() {
		return (<div style={Styles.container}>
			<TopBarComponent onClickSearch={this.onClickSearch}></TopBarComponent>
			<MainComponent selectedConversation={this.state.selectedConversation}></MainComponent>
		</div>)
	}
}