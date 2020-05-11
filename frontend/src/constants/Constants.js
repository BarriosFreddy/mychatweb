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
	USER_TOKEN: 'mychatweb-token',
	CURRENT_USER: 'current-user-mychatweb',
	RESOURCES: {
		AUTHENTICATION: '/authentication',
		USERS: '/users',
		CONVERSATIONS: '/conversations',
		FILES: '/files'
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
			findByName: '/name/',
			findByTypeAndMembers: '/type/:type/members/:members',
			findByTypeAndName: '/type/:type/name/:name',
			findPersonalConversation: '/members/:members'
		},
		FILE: {
			upload: '/',
			image: '/image/',
		}
	}
}

export default Constants;