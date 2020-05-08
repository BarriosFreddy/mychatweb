import axios from 'axios';
import Constants from "../constants/Constants";

// Create an instance of axios library with the base URL
export default axios.create({
	baseURL: Constants.API
});