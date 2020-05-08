import Colors from "../../../Colors";

export default {
	container: {
		height: '95vh',
		width: '20vw',
		background: '#5c3a58',
		color: Colors.white,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch'
	},
	search: {
		padding: '2px',
		margin: '5px',
		height: '24px',
	},
	headerItem: {
		padding: '3px', 
		background: 'transparent',
		cursor: 'pointer',
		fontWeight: 'bold'
	},
	item: {
		padding: '3px', 
		background: 'transparent',
		cursor: 'pointer'
	},
	currentUser: {
		background: 'transparent',
		cursor: 'pointer'
	},
	searchButton: {
		background: Colors.green
	}
}