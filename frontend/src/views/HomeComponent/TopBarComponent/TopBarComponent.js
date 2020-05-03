import React from 'react';
import Styles from './Styles';


export class TopBarComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {}
	}

	render() {
		return (<div style={Styles.container}>
			<div style={Styles.leftSide}></div>
			<div style={Styles.rightSide}><i style={Styles.logo}>My Chat Web</i></div>
		</div>)
	}
}