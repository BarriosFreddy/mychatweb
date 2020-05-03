const router = require('express').Router();
const paths = require('../constants/Paths');
const ConversationService = require('../services/ConversationService');


router.post(paths.conversation.save, (request, response) => {
	const { body } = request;
	ConversationService.save(body)
		.then(conversation => response.send(conversation))
		.catch(error => console.error(error));
});

router.put(paths.conversation.update, (request, response) => {
	const { body } = request;
	const id = request.params.id;

	ConversationService.findById(id).then(conversation => {
		if (conversation && body._id && body._id === id) {
			ConversationService.update(id, body)
				.then(conversation => response.send(conversation))
				.catch(error => {
					response.sendStatus(500);
					console.error(error);
				});
		} else {
			response.send(null)
		}
	})
});

router.get(paths.conversation.findAll, (request, response) => {
	ConversationService.findAll()
		.then(conversationList => response.send(conversationList))
		.catch(error => console.error(error));
});

router.get(paths.conversation.findById, (request, response) => {
	const id = request.params.id;
	ConversationService.findById(id)
		.then(conversation => response.send(conversation))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

router.delete(paths.conversation.delete, (request, response) => {
	const id = request.params.id;
	ConversationService.delete(id)
		.then(conversation => response.send(conversation))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

module.exports = router;