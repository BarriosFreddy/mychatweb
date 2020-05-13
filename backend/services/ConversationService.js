const Conversation = require('../models/Conversation');
const User = require('../models/User');
const ConversationType = require('../constants/ConversationType');

class ConversationService {
	constructor() {
	}

	/**
	 * Save Conversation
	 * @param {Object} conversation 
	 */
	async save(conversation) {
		const conversationModel = new Conversation(conversation);
		const savedConversation = await conversationModel.save();
		return User.populate(savedConversation, { path: 'members' });
	}

	/**
	 * Update Conversation
	 * @param {Number} id 
	 * @param {Object} conversation 
	 */
	async update(id, conversation) {
		const conversationRetrieved = await Conversation.findOne({ _id: id }).populate('members');
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
	 * List Conversations
	 */
	findAll() {
		return Conversation.find().populate('members');
	}

	/**
	 * Find a conversation by id
	 * @param {Number} id 
	 */
	findById(id) {
		return Conversation.findById(id).populate('members');
	}

	/**
	 * List Conversations by type
	 * @param {String} type 
	 */
	findByType(type) {
		return Conversation.find({ type }).populate('members');
	}

	/**
	 * Find a conversation by name
	 * @param {String} name 
	 */
	findByName(name) {
		return Conversation.find({ name: new RegExp('.*' + name + '.*', "i") }).populate('members');
	}

	/**
	 * List Conversations by type and list of members(Users)
	 * @param {String} type 
	 * @param {[ObjectId]} membersArray 
	 */
	findByTypeAndMembers(type, membersArray) {
		return Conversation.find({ type, members: { $in: membersArray } }).populate('members');
	}

	/**
	 * List Conversations by type and name
	 * @param {String} type 
	 * @param {String} name 
	 */
	findByTypeAndName(type, name) {
		return Conversation.find({ type, name: new RegExp('.*' + name + '.*', "i") }).populate('members');
	}

	/**
	 * List Conversations by members array
	 * @param {[ObjectId]} membersArray 
	 */
	findPersonalConversation(membersArray) {
		return Conversation.find({ type: ConversationType.PERSONAL, members: membersArray })
			.populate('members');
	}

	/**
	 * Delete a Conversation by id
	 * @param {Number} id 
	 */
	async delete(id) {
		return Conversation.findByIdAndDelete(id);
	}
}

module.exports = new ConversationService();