const User = require('./../models/User');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class UserService {
	constructor() { }

	/**
	 * 
	 * @param {Object} user 
	 */
	save(user) {
		const userModel = new User(user);
		return userModel.save();
	}

	/**
	 * 
	 * @param {Number} id 
	 * @param {Object} user 
	 */
	async update(id, user) {
		const userRetrieved = await User.findOne({ _id: id });
		const userUpdated = {
			...userRetrieved,
			...user
		};
		const userModel = new User(userUpdated);
		userModel.isNew = false;
		return userModel.save();
	}

	/**
	 * 
	 * @param {Object} filter 
	 */
	findAll(filter) {
		if (filter) {
			return User.find(filter);
		}
		return User.find();
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	findById(id) {
		return User.findById(id);
	}

	/**
	 * 
	 * @param {String} username 
	 */
	findByUsername(username) {
		return User.findOne({ username });
	}

	/**
	 * 
	 * @param {Number} id 
	 */
	async delete(id) {
		return User.findByIdAndDelete(id);
	}
}

module.exports = new UserService