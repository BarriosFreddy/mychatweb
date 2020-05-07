import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { AUTHENTICATION } = Constants.RESOURCES;
const { LOGIN } = Constants.ENDPOINTS;
class AuthenticationService extends Middleware {

	login(body) {
		return super.post(AUTHENTICATION + LOGIN, body);
	}
}

export default new AuthenticationService();