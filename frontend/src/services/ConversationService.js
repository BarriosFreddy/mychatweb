import Middleware from "./Middleware";
import Constants from "../constants/Constants";

const { CONVERSATIONS } = Constants.RESOURCES;
const { CONVERSATION } = Constants.ENDPOINTS;

/**
 *  ConversationService class
 */
class ConversationService extends Middleware {

	/**
	 * Save a Conversation
	 * @param {Object} body 
	 */
	save(body) {
		const endpointPath = CONVERSATIONS + CONVERSATION.save;
		return super.post(endpointPath, body);
	}

	/**
	 * 	/**
	 * Update a Conversation
	 * @param {Number} id 
	 * @param {Object} body 
	 */
	update(id, body) {
		const endpointPath = CONVERSATIONS + CONVERSATION.update + id;
		return super.put(endpointPath, body);
	}

	/**
	 * Find a Conversation by id
	 * @param {Number} id 
	 */
	findById(id) {
		const endpointPath = CONVERSATIONS + CONVERSATION.findById + id;
		return super.get(endpointPath);
	}

	/**
	 * List Conversations by type and list of members(Users)
	 * @param {String} type 
	 * @param {[ObjectId]} members 
	 */
	findByTypeAndMembers(type, members) {
		const endpoint = CONVERSATION.findByTypeAndMembers.replace(':type', type).replace(':members', members);
		const endpointPath = CONVERSATIONS + endpoint;
		return super.get(endpointPath);
	}

	/**
	 * List Conversations by members array
	 * @param {String} type 
	 * @param {[ObjectId]} members 
	 */
	findPersonalConversation(members) {
		const endpoint = CONVERSATION.findPersonalConversation.replace(':members', members);
		const endpointPath = CONVERSATIONS + endpoint;
		return super.get(endpointPath);
	}


	/**
	 * List Conversations by type
	 * @param {String} type 
	 */
	findByType(type) {
		const endpointPath = CONVERSATIONS + CONVERSATION.findByType + type;
		return super.get(endpointPath);
	}

	/**
	 * Find a Conversation by name
	 * @param {String} name 
	 */
	findByName(name) {
		const endpointPath = CONVERSATIONS + CONVERSATION.findByName + name;
		return super.get(endpointPath);
	}

	/**
	 * List Conversations by type and name
	 * @param {String} type 
	 * @param {[ObjectId]} members 
	 */
	findByTypeAndName(type, name) {
		const endpoint = CONVERSATION.findByTypeAndName.replace(':type', type).replace(':name', name);
		const endpointPath = CONVERSATIONS + endpoint;
		return super.get(endpointPath);
	}

	/**
	 * List Conversations
	 */
	findAll() {
		const endpointPath = CONVERSATIONS + CONVERSATION.findAll;
		return super.get(endpointPath);
	}

	/**
	 * Delete a Conversation by id
	 * @param {Number} id 
	 */
	delete(id) {
		const endpointPath = CONVERSATIONS + CONVERSATION.delete + id;
		return super.delete(endpointPath);
	}
}

export default new ConversationService();