const PATHS_GENERIC = {
	save: '/',
	update: '/',
	findById: '/',
	findAll: '/',
	delete: '/',
}

const Constants = {
	API: 'https://mychatweb-backend.herokuapp.com',
	// API: 'http://localhost:3000',
	COMUNICATION_ENDPOINT: "https://mychatweb-backend.herokuapp.com",
	// COMUNICATION_ENDPOINT: "http://localhost:4000",
	HTTP_VERBS: {
		POST: 'post',
		PUT: 'put',
		GET: 'get',
		DELETE: 'delete',
	},
	USER_TOKEN: 'mychatweb-token',
	CURRENT_USER: 'current-user-mychatweb',
	RESOURCES: {
		AUTHENTICATION: '/authentication',
		USERS: '/users',
		CONVERSATIONS: '/conversations'
	},
	ENDPOINTS: {
		LOGIN: '/login',
		USER: {
			...PATHS_GENERIC,
			findByUsername: '/username/'
		},
		CONVERSATION: {
			...PATHS_GENERIC,
			findByType: '/type/',
			findByTypeAndMember: '/type/:type/member/:member'
		}
	}
}

export default Constants;