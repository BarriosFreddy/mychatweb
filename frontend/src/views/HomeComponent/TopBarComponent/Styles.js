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
		lineHeight: 2
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
	item: {
		padding: '3px',
		background: 'transparent',
		cursor: 'pointer'
	},
	searchOverlay: {
		overflow: 'auto',
		backgroundColor: 'white',
		padding: '2px 10px',
		borderRadius: 3,
		width: '45vw',
		minHeight: '10vh',
		maxHeight: '30vh',
		border: '1px solid gray',
	}
}