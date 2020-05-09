import Colors from "../../../Colors";

export default {
	container: {
		height: '95vh',
		width: '20vw',
		background: Colors.voilet,
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
	currentUser: {
		padding: '15px', 
		background: 'transparent',
		cursor: 'pointer',
		fontWeight: 'bold'
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
	searchButton: {
		background: Colors.green
	}
}