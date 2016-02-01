'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseJSON = parseJSON;
exports.get = get;
exports.post = post;
var apiEndpoint = function apiEndpoint(endpoint) {
	return 'http://localhost:8080/api/' + endpoint;
}; // eslint-disable-line

function parseJSON(response) {
	return response.json();
}

function get(endpoint) {
	return fetch(apiEndpoint(endpoint)).then(parseJSON);
}

function post(endpoint, body) {
	return fetch(apiEndpoint(endpoint), {
		type: 'post',
		body: body
	}).then(parseJSON);
}