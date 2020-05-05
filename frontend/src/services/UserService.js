import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const URI = Constants.URI.USERS;
const ENDPOINTS = Constants.RESOURCES.USER;
class UserService_ extends Middleware {

	save(body) {
		return super.post(URI + ENDPOINTS.save, body);
	}
	update(uri, body) {
		return super.put(uri, { body });
	}
	findById(id) {
		return super.get(`${URI + ENDPOINTS.findById + id}`);
	}
	findAll(filter) {
		return super.get(URI + ENDPOINTS.findAll);
	}
	delete(uri) {
		return super.delete(uri);
	}
}
const UserService = new UserService_();
export default UserService;