const router = require('express').Router();
const Constants = require('../constants/Constants');
const UserService = require('./../services/UserService');

const { USER } = Constants.RESOURCES;

router.post(USER.save, (request, response) => {
	const { body } = request;
	UserService.save(body)
		.then(user => response.send(user))
		.catch(error => {
			response.status(400).send(error);
		});
});

router.put(USER.update, (request, response) => {
	const { body } = request;
	const id = request.params.id;

	UserService.findById(id).then(user => {
		if (user && body._id && body._id === id) {
			UserService.update(id, body)
				.then(user => response.send(user))
				.catch(error => {
					response.status(500).send(error);
					console.error(error);
				});
		} else {
			response.send(null)
		}
	})
});

router.get(USER.findAll, (request, response) => {
	UserService.findAll()
		.then(userList => response.send(userList))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

router.get(USER.findById, (request, response) => {
	const id = request.params.id;
	UserService.findById(id)
		.then(user => response.send(user))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

router.delete(USER.delete, (request, response) => {
	const id = request.params.id;
	UserService.delete(id)
		.then(user => response.send(user))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

module.exports = router;