import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const URI = Constants.URI.AUTHENTICATION;
class AuthService_ extends Middleware {

	login(body) {
		return super.post(URI, body);
	}
}
const AuthService = new AuthService_();
export default AuthService;