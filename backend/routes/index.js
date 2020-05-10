const router = require('express').Router();
const users = require('./UsersRouter');
const conversation = require('./ConversationsRouter');
const authentication = require('./AuthenticationRouter');
const file = require('./FileRouter');
const Constants = require('./../constants/Constants');

router.use(Constants.URI.AUTHENTICATION, authentication);
router.use(Constants.URI.USERS, users);
router.use(Constants.URI.CONVERSATIONS, conversation);
router.use(Constants.URI.FILES, file);

router.get(Constants.URI.HOME, (request, response) => {
	response.send('My chat web API!');
})

module.exports = router;

