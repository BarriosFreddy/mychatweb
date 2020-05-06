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
	RESOURCES: {
		AUTHENTICATION: '/authentication',
		USERS: '/users',
		CONVERSATIONS: '/conversations'
	},
	ENDPOINTS: {
		LOGIN: '/login',
		USER: {
			...PATHS_GENERIC
		},
		CONVERSATION: {
			...PATHS_GENERIC
		}
	}
}

export default Constants;