const Conversation = require('../models/Conversation');

class ConversationService {
	constructor() { }

	/**
	 * 
	 * @param {Object} conversation 
	 */
	save(conversation) {
		const conversationModel = new Conversation(conversation);
		return conversationModel.save();
	}

	/**
	 * 
	 * @param {Number} id 
	 * @param {Object} conversation 
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
	 * @param {Object} filter
	 */
	findAll(filter) {
		if (filter) {
			return Conversation.find(filter);
		}
		return Conversation.find();
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	findById(id) {
		return Conversation.findById(id);
	}

	/**
	 * 
	 * @param {String} type 
	 */
	findByType(type) {
		return Conversation.find({ type });
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	async delete(id) {
		return Conversation.findByIdAndDelete(id);
	}
}

module.exports = new ConversationService();