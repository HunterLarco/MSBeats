const apiEndpoint = (endpoint) => 'http://localhost:8080/${endpoint}';

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
