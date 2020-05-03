import React from 'react';
import Styles from './Styles';


export class MessageFormComponent extends React.Component {
	constructor(props) {
		super()
		this.state = {}
	}

	render() {
		return (<div style={Styles.container}>
			<p>Message form</p>
		</div>)
	}
}