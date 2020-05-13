const router = require('express').Router();
const Constants = require('../constants/Constants');
const ConversationService = require('../services/ConversationService');

const { CONVERSATION } = Constants.RESOURCES;

/**
 * Save endpoint
 * Receives a conversation model
 * Produces a saved conversation model
 */
router.post(CONVERSATION.save, (request, response) => {
	const { body } = request;
	ConversationService.save(body)
		.then(conversation => {
			console.log("conversation saved", conversation);
			response.send(conversation)
		})
		.catch(error => console.error(error));
});

/**
 * Update endpoint
 * Receives a model identifier and a conversation model
 * Produces a updated conversation model
 */
router.put(CONVERSATION.update, (request, response) => {
	const { body } = request;
	const { id } = request.params;

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

/**
 * FindAll endpoint
 * Recieves no parameters
 * Produces a list of conversations
 */
router.get(CONVERSATION.findAll, (request, response) => {
	ConversationService.findAll()
		.then(conversationList => response.send(conversationList))
		.catch(error => console.error(error));
});

/**
 * FindById endpoint
 * Recieves a model id
 * Produces a conversation model
 */
router.get(CONVERSATION.findById, (request, response) => {
	const { id } = request.params;
	ConversationService.findById(id)
		.then(conversation => response.send(conversation))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

/**
 * FindByType endpoint
 * Recieves a conversation type
 * Produces a list of conversations
 */
router.get(CONVERSATION.findByType, (request, response) => {
	const { type } = request.params;
	ConversationService.findByType(type)
		.then(conversations => response.send(conversations))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * FindByName endpoint
 * Recieves a conversation name
 * Produces a list of conversations
 */
router.get(CONVERSATION.findByName, (request, response) => {
	const { name } = request.params;
	ConversationService.findByName(name)
		.then(conversations => response.send(conversations))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * FindByTypeAndName endpoint
 * Recieves a type and a conversation name
 * Produces a list of conversations
 */
router.get(CONVERSATION.findByTypeAndName, (request, response) => {
	const { type, name } = request.params;
	ConversationService.findByTypeAndName(type, name)
		.then(conversations => response.send(conversations))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * FindByTypeAndMembers endpoint
 * Recieves a type and a list of members(Users)
 * Produces a list of conversations
 */
router.get(CONVERSATION.findByTypeAndMembers, (request, response) => {
	const { type, members } = request.params;
	const membersArray = members.split(',');
	ConversationService.findByTypeAndMembers(type, membersArray)
		.then(conversations => response.send(conversations))
		.catch(error => {
			response.status(500).send(error);
			console.error(error);
		});
});

/**
 * FindPersonalConversation endpoint
 * Recieves a list of members(Users)
 * Produces a list of conversations
 */
router.get(CONVERSATION.findPersonalConversation, (request, response) => {
	const { members } = request.params;
	const membersArray = members.split(',');
	ConversationService.findPersonalConversation(membersArray)
		.then(conversations => response.send(conversations))
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
router.delete(CONVERSATION.delete, (request, response) => {
	const { id } = request.params;
	ConversationService.delete(id)
		.then(conversation => response.send(conversation))
		.catch(error => {
			response.sendStatus(500);
			console.error(error);
		});
});

module.exports = router;