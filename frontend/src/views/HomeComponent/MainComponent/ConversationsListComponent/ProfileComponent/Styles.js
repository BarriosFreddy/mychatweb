import Colors from "../../../../Colors";

export default {
	container: {
		width: '20vw',
		background: Colors.voilet,
		color: Colors.white,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch'
	},
	currentUser: {
		padding: '15px', 
		background: 'transparent',
		cursor: 'pointer',
		fontWeight: 'bold'
	},
	closeSection: {
		width: '100%',
		height: '27px'
	},
	buttonClose: {
		margin: '5px',
		float: 'right'
	},
	overlay: {
		backgroundColor: 'white',
		borderRadius: 3,
		border: '1px solid gray',
	},
	contentOverlay: {
		overflow: 'auto',
		padding: '10px',
		minWidth: '30vh',
		minHeight: '40vh',
		maxHeight: '40vh',
	},
	image: {
		width: '100px',
		height: '100px'
	}
}