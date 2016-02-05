import { post } from './api'

const endpoint = 'login/'

export default class UserApiEndpoint {
	static login (emailusername, password) {
		return post(endpoint, { emailusername, password })
	}
}
