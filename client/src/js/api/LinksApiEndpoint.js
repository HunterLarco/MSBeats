import { get, post } from './api'

const endpoint = 'links';

export default class LinksApiEndpoint {
	static get () { return get(endpoint) }
	static post (formData) { return post(endpoint, formData) }
}
