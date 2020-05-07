import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { CONVERSATIONS } = Constants.RESOURCES;
const { CONVERSATION } = Constants.ENDPOINTS;
class ConversationService extends Middleware {

	save(body) {
		return super.post(CONVERSATIONS + CONVERSATION.save, body);
	}
	update(body) {
		return super.post(CONVERSATIONS + CONVERSATION.update, body);
	}
	findById(id) {
		return super.get(`${CONVERSATIONS + CONVERSATION.findById + id}`);
	}
	findByType(type) {
		return super.get(`${CONVERSATIONS + CONVERSATION.findByType + type}`);
	}
	findAll(filter) {
		return super.get(CONVERSATIONS + CONVERSATION.findAll);
	}
	delete(uri) {
		return super.delete(uri);
	}
}

export default new ConversationService();