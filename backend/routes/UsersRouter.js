const router = require('express').Router();
const paths = require('../constants/Paths');
const UserService = require('./../services/UserService');


router.post(paths.user.save, (request, response) => {
	const { body } = request;
	UserService.save(body)
		.then(user => response.send(user))
		.catch(error => console.error(error));
});

router.put(paths.user.update, (request, response) => {
	const { body } = request;
	const id = request.params.id;

	UserService.findById(id).then(user => {
		if (user && body._id && body._id === id) {
			UserService.update(id, body)
				.then(user => response.send(user))
				.catch(error => {
					response.sendStatus(500);
					console.error(error);
				});
		} else {
			response.send(null)
		}
	})
});

router.get(paths.user.findAll, (request, response) => {
	UserService.findAll()
		.then(userList => response.send(userList))
		.catch(error => console.error(error));
});

router.get(paths.user.findById, (request, response) => {
	const id = request.params.id;
	UserService.findById(id)
		.then(user => response.send(user))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

router.delete(paths.user.delete, (request, response) => {
	const id = request.params.id;
	UserService.delete(id)
		.then(user => response.send(user))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

module.exports = router;