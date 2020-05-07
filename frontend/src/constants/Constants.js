const PATHS_GENERIC = {
	save: '/',
	update: '/',
	findById: '/',
	findAll: '/',
	delete: '/',
}

const Constants = {
	// API: 'https://mychatweb-backend.herokuapp.com',
	API: 'http://localhost:3000',
	HTTP_VERBS: {
		POST: 'post',
		PUT: 'put',
		GET: 'get',
		DELETE: 'delete',
	},
	USER_TOKEN: 'user-mychatweb-token',
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
			...PATHS_GENERIC,
			findByType: '/type/'
		}
	}
}

export default Constants;