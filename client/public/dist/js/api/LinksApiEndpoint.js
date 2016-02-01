'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LinksApiEndpoint = undefined;

var _api = require('api');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinksApiEndpoint = exports.LinksApiEndpoint = function () {
	function LinksApiEndpoint() {
		_classCallCheck(this, LinksApiEndpoint);
	}

	_createClass(LinksApiEndpoint, null, [{
		key: 'get',
		value: function get() {
			return (0, _api.get)(this.endpoint);
		}
	}, {
		key: 'post',
		value: function post(formData) {
			return (0, _api.post)(this.endpoint, formData);
		}
	}, {
		key: 'endpoint',
		get: function get() {
			return 'links';
		}
	}]);

	return LinksApiEndpoint;
}();