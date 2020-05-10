const Conversation = require('../models/Conversation');

class ConversationService {
	constructor() {
		this.socket = null;
		this.IOServer = null;
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
	 * @param {String} type 
	 * @param {ObjectId} userId 
	 */
	findByTypeAndMember(type, member) {
		return Conversation.find({ type, members: member }).populate('members');
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	async delete(id) {
		return Conversation.findByIdAndDelete(id);
	}

	setSocket(socket) {
		this.socket = socket;
	}

	getSocket() {
		return this.socket;
	}

	setIOServer(IOServer) {
		this.IOServer = IOServer;
	}

	getIOServer() {
		return this.IOServer;
	}
}

module.exports = new ConversationService();