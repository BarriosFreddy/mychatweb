import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { USERS } = Constants.RESOURCES;
const { USER } = Constants.ENDPOINTS;
class UserService extends Middleware {

	save(body) {
		return super.post(USERS + USER.save, body);
	}
	update(uri, body) {
		return super.post(USERS + USER.update, body);
	}
	findById(id) {
		return super.get(`${USERS + USER.findById + id}`);
	}
	findAll(filter) {
		return super.get(USERS + USER.findAll);
	}
	delete(uri) {
		return super.delete(uri);
	}
}

export default new UserService();