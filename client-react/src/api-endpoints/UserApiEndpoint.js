import { post } from './api'

export default class UserApiEndpoint {
	static login (emailusername, password) {
		return post('login', { emailusername, password });
	}
	static signup (email, username, password, inviteid) {
		return post('signup', { email, username, password, inviteid });
	}
}
