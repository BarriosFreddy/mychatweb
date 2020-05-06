import React from 'react';
import Styles from './Styles';
import { TopBarComponent } from './TopBarComponent/TopBarComponent';
import { MainComponent } from './MainComponent/MainComponent';

export class HomeComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {
		}
	}

	render() {
		return (<div style={Styles.container}>
			<TopBarComponent></TopBarComponent>
			<MainComponent></MainComponent>
		</div>)
	}
}