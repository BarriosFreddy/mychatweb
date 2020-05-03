const router = require('express').Router();
const users = require('./UsersRouter');
const conversation = require('./ConversationsRouter');
const PATHS = require('./../constants/Paths');

router.use(PATHS.uri.users, users);
router.use(PATHS.uri.conversations, conversation);

router.get(PATHS.uri.home, (request, response) => {
	response.send('My chat web API!');
})

module.exports = router;

