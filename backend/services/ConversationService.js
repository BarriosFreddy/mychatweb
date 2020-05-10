const Conversation = require('../models/Conversation');
const ConversationType = require('../constants/ConversationType');

class ConversationService {
	constructor() {
	}

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
		conversationRetrieved.name = conversation.name;
		conversationRetrieved.type = conversation.type;
		conversationRetrieved.members = conversation.members;
		conversationRetrieved.messages = conversation.messages;
		conversationRetrieved.createdAt = conversation.createdAt;
		conversationRetrieved.updatedAt = conversation.updatedAt;
		conversationRetrieved.isNew = false;
		return conversationRetrieved.save();
	}

	/**
	 * 
	 */
	findAll() {
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
	 * @param {String} name 
	 */
	findByName(name) {
		return Conversation.find({ name: new RegExp('.*' + name + '.*', "i") });
	}

	/**
	 * 
	 * @param {String} type 
	 * @param {[ObjectId]} membersArray 
	 */
	findByTypeAndMembers(type, membersArray) {
		return Conversation.find({ type, members: { $in: membersArray } }).populate('members');
	}

	/**
	 * 
	 * @param {String} type 
	 * @param {String} name 
	 */
	findByTypeAndName(type, name) {
		return Conversation.find({ type, name: new RegExp('.*' + name + '.*', "i") }).populate('members');
	}

	/**
	 * 
	 * @param {[ObjectId]} membersArray 
	 */
	findPersonalConversation(membersArray) {
		return Conversation.find({ type: ConversationType.PERSONAL, members: membersArray })
			.populate('members');
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