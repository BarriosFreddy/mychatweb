import API from "./API";
import Constants from "../constants/Constants";
/**
 * Middleware class 
 */
export default class Middleware {

	/**
	 * 
	 * @param {String} uri 
	 * @param {Object} body 
	 */
	post(uri, body) {
		return API({
			method: Constants.HTTP_VERBS.POST,
			url: uri,
			data: body
		});
	}

	postFormData(uri, formData) {
		return API.post(uri, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	/**
	 * 
	 * @param {String} uri 
	 * @param {Object} body 
	 */
	put(uri, body) {
		return API({
			method: Constants.HTTP_VERBS.PUT,
			url: uri,
			data: body
		});
	}

	/**
	 * 
	 * @param {String} uri 
	 */
	get(uri) {
		return API({
			method: Constants.HTTP_VERBS.GET,
			url: uri
		});
	}

	/**
	 * 
	 * @param {String} uri 
	 */
	delete(uri) {
		return API({
			method: Constants.HTTP_VERBS.DELETE,
			url: uri
		});
	}

}