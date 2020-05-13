import React from 'react';
import Styles from './Styles';


export class MessagesLogComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (<div className={this.props.isAuthor ? 'right' : 'left'}
			style={Styles.container}>
			{this.props.message}
		</div >)
	}
}