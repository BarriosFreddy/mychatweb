const router = require('express').Router();
const Constants = require('../constants/Constants');
const ConversationService = require('../services/ConversationService');

const { CONVERSATION } = Constants.RESOURCES;

router.post(CONVERSATION.save, (request, response) => {
	const { body } = request;
	ConversationService.save(body)
		.then(conversation => response.send(conversation))
		.catch(error => console.error(error));
});

router.put(CONVERSATION.update, (request, response) => {
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

router.get(CONVERSATION.findAll, (request, response) => {
	ConversationService.findAll()
		.then(conversationList => response.send(conversationList))
		.catch(error => console.error(error));
});

router.get(CONVERSATION.findById, (request, response) => {
	const id = request.params.id;
	ConversationService.findById(id)
		.then(conversation => response.send(conversation))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

router.delete(CONVERSATION.delete, (request, response) => {
	const id = request.params.id;
	ConversationService.delete(id)
		.then(conversation => response.send(conversation))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

module.exports = router;