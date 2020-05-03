const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const conversationSchema = new Schema({
	name: { type: String },
	type: { type: String, enum: ['P', 'G'] },
	members: [ObjectId],
	messages: [{
		author: {type: ObjectId, ref: 'User' },
		message: { type: String },
		createdAt: { type: Date, default: Date.now }
	}],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', conversationSchema);