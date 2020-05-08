import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { CONVERSATIONS } = Constants.RESOURCES;
const { CONVERSATION } = Constants.ENDPOINTS;

/**
 *  ConversationService class
 */
class ConversationService extends Middleware {

	/**
	 * 
	 * @param {Object} body 
	 */
	save(body) {
		const endpointPath = CONVERSATIONS + CONVERSATION.save;
		return super.post(endpointPath, body);
	}

	/**
	 * 
	 * @param {Object} body 
	 */
	update(id, body) {
		const endpointPath = CONVERSATIONS + CONVERSATION.update + id;
		return super.post(endpointPath, body);
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	findById(id) {
		const endpointPath = CONVERSATIONS + CONVERSATION.findById + id;
		return super.get(endpointPath);
	}

	/**
	 * 
	 * @param {Object} type 
	 */
	findByType(type) {
		const endpointPath = CONVERSATIONS + CONVERSATION.findByType + type;
		return super.get(endpointPath);
	}

	/**
	 * 
	 * @param {Object} filter 
	 */
	findAll(filter) {
		const endpointPath = CONVERSATIONS + CONVERSATION.findAll;
		return super.get(endpointPath);
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	delete(id) {
		const endpointPath = CONVERSATIONS + CONVERSATION.delete + id;
		return super.delete(endpointPath);
	}
}

export default new ConversationService();