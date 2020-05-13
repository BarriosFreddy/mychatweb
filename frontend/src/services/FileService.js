import Middleware from "./Middleware";
import Constants from "../constants/Constants";
import * as firebase from "firebase";


const { FILES } = Constants.RESOURCES;
const { FILE } = Constants.ENDPOINTS;

const firebaseConfig = {
	apiKey: "AIzaSyAB_5uta9tzQNwssN6uIEtPsnQgf54N-Bc",
	authDomain: "mychatweb-15808.firebaseapp.com",
	databaseURL: "https://mychatweb-15808.firebaseio.com",
	projectId: "mychatweb-15808",
	storageBucket: "mychatweb-15808.appspot.com",
	messagingSenderId: "653032904442",
	appId: "1:653032904442:web:6a4d1240635977e12a9b43",
	measurementId: "G-0WHYPW361N"
};

/**
 * FileService class
 */
class FileService extends Middleware {
	constructor() {
		super()
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
			firebase.analytics();
		}
	}

	/**
	 * Upload a file
	 * @param {String} fileName 
	 * @param {Object} file 
	 */
	upload(fileName, file) {
		const fileRef = firebase.storage().ref().child(fileName);
		return fileRef.put(file);
	}

	/**
	 * Get URL of a file
	 * @param {String} url 
	 */
	getFileURL(url) {
		const fileRef = firebase.storage().ref(url);
		return fileRef.getDownloadURL();
	}
}

export default new FileService();