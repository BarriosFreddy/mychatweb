const User = require('./../models/User');

class UserService {
	constructor() { }
	
	save(user) {
		const userModel = new User(user)
		return userModel.save()
	}
}

module.exports = new UserService 