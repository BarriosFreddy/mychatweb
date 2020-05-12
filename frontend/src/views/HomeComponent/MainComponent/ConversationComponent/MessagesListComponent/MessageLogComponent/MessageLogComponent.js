import React from 'react';
import Styles from './Styles';


export class MessagesLogComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.alignRight = { alignSelf: 'flex-end', marginRight: '20px' };
		this.alignLeft = { alignSelf: 'flex-start', marginLeft: '20px' };
	}

	align() {
		let side = {}
		if (this.props.isAuthor) {
			side = this.alignRight;
		} else {
			side = this.alignLeft;
		}
		return side;
	}


	render() {
		return (<div className={this.props.isAuthor ? 'right' : 'left'}
			style={Styles.container}>
			{this.props.message}
		</div >)
	}
}