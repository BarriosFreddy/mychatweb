const router = require('express').Router();
const Constants = require('../constants/Constants');
const UserService = require('./../services/UserService');

const { USER } = Constants.RESOURCES;

/**
 * Save endpoint
 * Receives a user model
 * Produces a saved user model
 */
router.post(USER.save, (request, response) => {
	const { body } = request;
	UserService.save(body)
		.then(user => response.send(user))
		.catch(error => {
			response.status(400).send(error);
		});
});

/**
 * Update endpoint
 * Receives a model identifier and a user model
 * Produces a updated user model
 */
router.put(USER.update, (request, response) => {
	const { body } = request;
	const { id } = request.params;

	UserService.findById(id).then(user => {
		console.log('Updated found', user);
		if (user && body._id && body._id === id) {
			console.log('Id equals', id);
			UserService.update(id, body)
				.then(user => {
					console.log('Updated user', user);

					response.send(user)
				})
				.catch(error => {
					response.status(500).send(error);
					console.error(error);
				});
		} else {
			response.send(null)
		}
	}).catch(error => {
		response.status(400).send(error);
		console.error(error);
	});
});

/**
 * FindAll endpoint
 * Recieves no parameters
 * Produces a list of users
 */
router.get(USER.findAll, (request, response) => {
	UserService.findAll()
		.then(userList => response.send(userList))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * FindById endpoint
 * Recieves a model id
 * Produces a user model
 */
router.get(USER.findById, (request, response) => {
	const { id } = request.params;
	UserService.findById(id)
		.then(user => response.send(user))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * FindByUsername endpoint
 * Recieves a user name
 * Produces a list of users
 */
router.get(USER.findByUsername, (request, response) => {
	const { username } = request.params;
	UserService.findByUsernameInsensitive(username)
		.then(userList => response.send(userList))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * Delete endpoint
 * Recieves a model id
 * Produces deleted model
 */
router.delete(USER.delete, (request, response) => {
	const { id } = request.params;
	UserService.delete(id)
		.then(user => response.send(user))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

module.exports = router;