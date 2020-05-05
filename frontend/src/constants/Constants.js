const PATHS_GENERIC = {
	save: '/',
	update: '/',
	findById: '/',
	findAll: '/',
	delete: '/',
}

const Constants = {
	API: 'https://mychatweb-backend.herokuapp.com',
	HTTP_VERBS: {
		POST: 'post',
		PUT: 'put',
		GET: 'get',
		DELETE: 'delete',
	},
	URI: {
		AUTHENTICATION: '/authentication',
		USERS: '/users',
		CONVERSATIONS: '/conversations'
	},
	RESOURCES: {
		USER: {
			...PATHS_GENERIC
		},
		CONVERSATION: {
			...PATHS_GENERIC
		}
	}
}

export default Constants;