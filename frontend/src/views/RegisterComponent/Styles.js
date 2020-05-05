import Colors from "../Colors";

export default {
	container: {
		height: '100vh',
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: Colors.voilet,
	},
	logoContainer: {
		marginTop: '10vh',
	},
	logo: {
		color: Colors.white,
		fontSize: 30,
		fontWeight: 'bold'
	},
	formContainer: {
		height: '320px',
		width: '400px',
		background: Colors.white,
		marginTop: '10vh',
		padding: 20,
		border: 1,
		borderRadius: 20,
	},
	field: {
		marginTop: '20px'
	},
	legend: {
		marginVertical: '0px',
		float: 'left'
	},
	recommendations: {
		fontSize: 11,	
		float: 'left'
	},
	buttonRegister: {
		marginTop: '80px',
		fontWeight: 'bold'
	}
}