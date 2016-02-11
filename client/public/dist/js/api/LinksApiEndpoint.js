'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('./api');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endpoint = 'links';

var LinksApiEndpoint = function () {
	function LinksApiEndpoint() {
		_classCallCheck(this, LinksApiEndpoint);
	}

	_createClass(LinksApiEndpoint, null, [{
		key: 'get',
		value: function get() {
			return (0, _api.get)(endpoint);
		}
	}, {
		key: 'post',
		value: function post(formData) {
			return (0, _api.post)(endpoint, formData);
		}
	}]);

	return LinksApiEndpoint;
}();

exports.default = LinksApiEndpoint;