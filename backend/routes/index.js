const router = require('express').Router();
const users = require('./UsersRouter');
const conversation = require('./ConversationsRouter');
const authentication = require('./AuthenticationRouter');
const Constants = require('./../constants/Constants');

// Associate routers of modules
router.use(Constants.URI.AUTHENTICATION, authentication);
router.use(Constants.URI.USERS, users);
router.use(Constants.URI.CONVERSATIONS, conversation);

// Home endpoint
router.get(Constants.URI.HOME, (request, response) => {
	response.send('My chat web API!');
})

module.exports = router;

