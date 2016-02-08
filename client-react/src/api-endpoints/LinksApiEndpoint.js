import { get, post } from './api';

const endpoint = 'links';

export default class LinksApiEndpoint {

	static get (filter, page) {
		return get(`${endpoint}/${filter}/${page}`);
	}

	static post (body) {
		return post(endpoint, body);
	}

	static comments (linkid) {
		return post(`${endpoint}/comments/get`, { linkid });
	}

	static createComment (commentid, text) {
		return post(`${endpoint}/comments/`, { commentid, text });
	}

	static upvote (linkid) {
		return post(`${endpoint}/vote/`, { linkid, upvoted: true });
	}

}
