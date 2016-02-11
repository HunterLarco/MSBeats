const apiEndpoint = (endpoint) => { return 'http://localhost:8080/api/' + endpoint; }; // eslint-disable-line

export function parseJSON (response) {
	return response.json();
}

export function get (endpoint) {
	return fetch(apiEndpoint(endpoint)).then(parseJSON);
}

export function post (endpoint, body) {
	return fetch(apiEndpoint(endpoint), {
		type: 'post',
		body
	}).then(parseJSON);
}
