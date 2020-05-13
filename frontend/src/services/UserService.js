import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { USERS } = Constants.RESOURCES;
const { USER } = Constants.ENDPOINTS;
class UserService extends Middleware {

	/**
	 * Save User
	 * @param {Object} body 
	 */
	save(body) {
		const endpointPath = USERS + USER.save;
		return super.post(endpointPath, body);
	}

	/**
	 * Update User
	 * @param {Number} id 
	 * @param {Object} body 
	 */
	update(id, body) {
		const endpointPath = USERS + USER.update + id;
		return super.put(endpointPath, body);
	}

	/**
	 * Find a user by id
	 * @param {Number} id 
	 */
	findById(id) {
		const endpointPath = USERS + USER.findById + id;
		return super.get(endpointPath);
	}

	/**
	 * Find user by user name
	 * @param {String} username 
	 */
	findByUsername(username) {
		const endpointPath = USERS + USER.findByUsername + username;
		return super.get(endpointPath);
	}

	/**
	 * List Users
	 */
	findAll() {
		const endpointPath = USERS + USER.findAll;
		return super.get(endpointPath);
	}

	/**
	 * Delete a User by id
	 * @param {Number} id 
	 */
	delete(id) {
		const endpointPath = USERS + USER.delete + id;
		return super.delete(endpointPath);
	}

	/**
	 * Get logged user in
	 */
	getCurrentUser() {
		return JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
	}
}

export default new UserService();