const User = require('./../models/User');

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
	findByUsernameInsensitive(username) {
		return User.find({ username: new RegExp('.*' + username + '.*', "i") });
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

module.exports = new UserService();