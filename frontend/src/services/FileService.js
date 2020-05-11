import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { FILES } = Constants.RESOURCES;
const { FILE } = Constants.ENDPOINTS;

/**
 * FileService class
 */
class FileService extends Middleware {

	upload(formData) {
		const endpointPath = FILES + FILE.upload;
		return super.postFormData(endpointPath, formData);
	}

	image(url) {
		const endpointPath = FILES + FILE.image + url;
		return super.get(endpointPath);
	}
}

export default new FileService();