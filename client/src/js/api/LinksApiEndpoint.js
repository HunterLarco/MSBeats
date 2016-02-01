import { get, post } from 'api'

export class LinksApiEndpoint {
	static get endpoint () { return 'links' }
	static get () { return get(this.endpoint) }
	static post (formData) { return post(this.endpoint, formData) }
}
