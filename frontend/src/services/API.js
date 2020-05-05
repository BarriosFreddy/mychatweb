import axios from 'axios';
import Constants from "../constants/Constants";

export default axios.create({
	baseURL: Constants.API
});