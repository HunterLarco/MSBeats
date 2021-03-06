import { get, post } from './api';

const endpoint = 'links';

export default class LinksApiEndpoint {

	static get (filter, page = 1) {
		return get(`${endpoint}/${filter}/${page}`);
	}

	static post (title, url = '', text = '') {
		return post(endpoint, { title, url, text });
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
