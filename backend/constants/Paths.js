const PATHS_GENERIC = {
	save: '/',
	update: '/:id',
	findById: '/:id',
	findAll: '/',
	delete: '/:id',
}

module.exports = {
	uri: {
		home: '/',
		users: '/users',
		conversations: '/conversations'
	},
	user: {
		...PATHS_GENERIC
	},
	conversation: {
		...PATHS_GENERIC
	}
}