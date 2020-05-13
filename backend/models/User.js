const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Create a user schema
 */
const userSchema = new Schema({
  imageUrl: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: [Schema.Types.ObjectId],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export User model
module.exports = mongoose.model('User', userSchema);