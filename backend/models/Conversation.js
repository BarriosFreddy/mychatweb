const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

/**
 * Create a conversation schema
 */
const conversationSchema = new Schema({
	name: { type: String },
	type: { type: String },
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	messages: [{
		author: { type: ObjectId, ref: 'User' },
		message: { type: String },
		createdAt: { type: Date, default: Date.now }
	}],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

// Create and export Conversation model
module.exports = mongoose.model('Conversation', conversationSchema);