const User = require('./../models/User');

class UserService {
	constructor() { }

	/**
	 * Save User
	 * @param {Object} user 
	 */
	save(user) {
		const userModel = new User(user);
		return userModel.save();
	}

	/**
	 * Update User
	 * @param {Number} id 
	 * @param {Object} user 
	 */
	async update(id, user) {
		const userRetrieved = await User.findOne({ _id: id });
		userRetrieved.imageUrl = user.imageUrl;
		userRetrieved.username = user.username;
		userRetrieved.password = user.password;
		userRetrieved.groups = user.groups;
		userRetrieved.active = user.active;
		userRetrieved.createdAt = user.createdAt;
		userRetrieved.updatedAt = user.updatedAt;

		userRetrieved.isNew = false;
		return userRetrieved.save();
	}

	/**
	 * List Users
	 */
	findAll() {
		return User.find();
	}

	/**
	 * Find a user by id
	 * @param {Number} id 
	 */
	findById(id) {
		return User.findById(id);
	}

	/**
	 * Find users by user name ignoring case
	 * @param {String} username 
	 */
	findByUsernameInsensitive(username) {
		return User.find({ username: new RegExp('.*' + username + '.*', "i") });
	}

	/**
	 * Find user by user name
	 * @param {String} username 
	 */
	findByUsername(username) {
		return User.findOne({ username });
	}

	/**
	 * Delete a User by id
	 * @param {Number} id 
	 */
	async delete(id) {
		return User.findByIdAndDelete(id);
	}
}

module.exports = new UserService();