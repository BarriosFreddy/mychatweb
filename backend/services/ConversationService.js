const Conversation = require('../models/Conversation');

class ConversationService {
	constructor() { }

	/**
	 * 
	 * @param {*} conversation 
	 */
	save(conversation) {
		const conversationModel = new Conversation(conversation);
		return conversationModel.save();
	}

	/**
	 * 
	 * @param {*} id 
	 * @param {*} conversation 
	 */
	async update(id, conversation) {
		const conversationRetrieved = await Conversation.findOne({ _id: id });
		const conversationUpdated = {
			...conversationRetrieved,
			...conversation
		};
		const conversationModel = new Conversation(conversationUpdated);
		conversationModel.isNew = false;
		return conversationModel.save();
	}

	/**
	 * 
	 * @param {*} filter 
	 */
	findAll(filter) {
		if (filter) {
			return Conversation.find(filter);
		}
		return Conversation.find();
	}

	/**
	 * 
	 * @param {*} id 
	 */
	findById(id) {
		return Conversation.findById(id);
	}

	findByType(type) {
		return Conversation.find({ type });
	}

	/**
	 * 
	 * @param {*} id 
	 */
	async delete(id) {
		return Conversation.findByIdAndDelete(id);
	}
}

module.exports = new ConversationService();