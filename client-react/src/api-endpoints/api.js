import reactCookie from 'react-cookie';

const apiEndpoint = (endpoint) => `http://localhost:8080/api/${endpoint}`;

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

function getAuthorizationHeader () {
	const loginid = reactCookie.load('loginid');
	if (loginid) {
		return { 'Authorization': loginid };
	}
	return {};
}

export function get (endpoint) {
	return fetch(apiEndpoint(endpoint), {
		method: 'GET',
		headers: getAuthorizationHeader()
	}).then(response => response.json());
}

export function post (endpoint, body) {
	console.log( Object.assign(getAuthorizationHeader(), headers));
	return fetch(apiEndpoint(endpoint), {
		method: 'POST',
		headers: Object.assign(getAuthorizationHeader(), headers),
		body: JSON.stringify(body)
	}).then(response => response.json());
}
