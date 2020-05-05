import API from "./API";
import Constants from "../constants/Constants";

export default class Middleware {

	post(uri, body) {
		return API({
			method: Constants.HTTP_VERBS.POST,
			url: uri,
			data: body
		});
	}
	put(uri, body) {
		return API({
			method: Constants.HTTP_VERBS.PUT,
			url: uri,
			data: body
		});
	}
	get(uri) {
		return API({
			method: Constants.HTTP_VERBS.GET,
			url: uri
		});
	}
	delete(uri) {
		return API({
			method: Constants.HTTP_VERBS.DELETE,
			url: uri
		});
	}

}