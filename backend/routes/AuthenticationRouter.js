const router = require('express').Router();
const Constants = require('../constants/Constants');
const UserService = require('./../services/UserService');

const { LOGIN } = Constants.RESOURCES;

router.post(LOGIN, (request, response) => {
	const { username, password } = request.body;
	UserService.findByUsername(username).then(userRetrieved => {
		if (userRetrieved && userRetrieved.password === password) {
			response.send(userRetrieved);
		} else {
			response.send(null);
		}
	});

});

module.exports = router;