import Colors from "../../Colors";

export default {
	container: {
		height: '5vh',
		width: '100vw',
		background: '#5c3a58',
		display: 'flex',
		flexDirection: 'row'
	},
	leftSide: {
		width: '20vw',
		height: '5vh',
	},
	rightSide: {
		width: '80vw',
		height: '5vh',
	},
	logo: {
		color: Colors.white,
		lineHeight: 2,
		margin: '5px 0 0 20px',
		fontWeight: 'bold'
	},
	search: {
		width: '40vw',
		margin: '3px auto 0 auto'
	},
	searchInput: {
		height: '4vh',
	},
	searchButton: {
		height: '4vh',
		background: 'white'
	},
	buttonIcon: {
		marginTop: '-5px'
	},
	closeSection: {
		width: '100%',
		height: '27px'
	},
	buttonClose: {
		margin: '5px',
		float: 'right'
	},
	item: {
		padding: '3px',
		background: 'transparent',
		cursor: 'pointer'
	},
	searchOverlay: {
		backgroundColor: 'white',
		borderRadius: 3,
		width: '45vw',
		border: '1px solid gray',
	},
	searchContentOverlay: {
		overflow: 'auto',
		padding: '10px 2px 10px 2px',
		minHeight: '10vh',
		maxHeight: '35vh',
	}
}