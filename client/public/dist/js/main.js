'use strict';

var _dom = require('./helpers/dom');

var _LinkCollection = require('./components/LinkCollection');

var _LinkCollection2 = _interopRequireDefault(_LinkCollection);

var _LinksApiEndpoint = require('./api/LinksApiEndpoint');

var _LinksApiEndpoint2 = _interopRequireDefault(_LinksApiEndpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main() {
	var $links = (0, _dom.$)('.js-LinkCollection');

	_LinksApiEndpoint2.default.get().then(function (_ref) {
		var links = _ref.links;

		console.log(links, new _LinkCollection2.default(links).render());
		$links.innerHTML = new _LinkCollection2.default(links).render();
	});
}

main();