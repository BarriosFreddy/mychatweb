import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { USERS } = Constants.RESOURCES;
const { USER } = Constants.ENDPOINTS;
class UserService extends Middleware {

	/**
	 * 
	 * @param {Object} body 
	 */
	save(body) {
		const endpointPath = USERS + USER.save;
		return super.post(endpointPath, body);
	}

	/**
	 * 
	 * @param {Number} id 
	 * @param {Object} body 
	 */
	update(id, body) {
		const endpointPath = USERS + USER.update + id;
		return super.put(endpointPath, body);
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	findById(id) {
		const endpointPath = USERS + USER.findById + id;
		return super.get(endpointPath);
	}

	/**
	 * 
	 * @param {String} username 
	 */
	findByUsername(username) {
		const endpointPath = USERS + USER.findByUsername + username;
		return super.get(endpointPath);
	}

	/**
	 * 
	 * @param {Object} filter 
	 */
	findAll(filter) {
		const endpointPath = USERS + USER.findAll;
		return super.get(endpointPath);
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	delete(id) {
		const endpointPath = USERS + USER.delete + id;
		return super.delete(endpointPath);
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
	}
}

export default new UserService();