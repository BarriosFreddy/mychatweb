const PATHS_GENERIC = {
	save: '/',
	update: '/:id',
	findById: '/:id',
	findAll: '/',
	delete: '/:id',
}

module.exports = {
	URL_DATABASE: 'mongodb://fbarrios:fbarrios7@ds121176.mlab.com:21176/heroku_vvf1zl9h',
	API_PORT: 3000,
	URI: {
		HOME: '/',
		AUTHENTICATION: '/authentication',
		USERS: '/users',
		CONVERSATIONS: '/conversations'
	},
	RESOURCES: {
		LOGIN: '/login',
		USER: {
			...PATHS_GENERIC,
			findByUsername: '/username/:username'
		},
		CONVERSATION: {
			...PATHS_GENERIC,
			findByType: '/type/:type',
			findByName: '/name/:name',
			findByTypeAndName: '/type/:type/name/:name',
			findByTypeAndMembers: '/type/:type/members/:members',
			findPersonalConversation: '/members/:members'
		}
	}
}