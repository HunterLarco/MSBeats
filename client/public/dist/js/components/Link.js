"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a Link components
 * @example
 * This data is in props
 *  {
 *    "created": "2016-02-01 05:36:19.986870",
 *    "user": {
 *      "created": "2016-02-01 05:36:19.971046",
 *      "email": "QI6QLLQ6TJ",
 *      "userid": 4917015999414272,
 *      "karma": 0,
 *      "username": "FBOJ5P1MF3"
 *    },
 *    "title": "WI9PG1304CBH9LC7BU6B0J2CLFC90GSPLLDBK2C086RZY8OR3OVKEH0ETWZ5P6HPSIJM0KJVQ8QHWGMRKP78R76EIVLDZG0FBM1G",
 *    "votes": 990,
 *    "linkid": 6042915906256896,
 *    "url": "50DDSM1ISP0CIBCNKSZV8C9DSGH0XUCN2C867WJ7"
 *  }
 */

var Link = function () {
	function Link() {
		var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Link);

		this.props = props;
	}

	_createClass(Link, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var created = _props.created;
			var user = _props.user;
			var title = _props.title;
			var votes = _props.votes;
			var linkid = _props.linkid;
			var url = _props.url;

			return "<div class=\"Pane SongListItem\">\n\t\t\t\t<div class=\"SongListItem-buttons\">\n\t\t\t\t\t<a class=\"SongListItem-upvote\"></a>\n\t\t\t\t\t<a class=\"SongListItem-downvote\"></a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"SongListItem-content\">\n\t\t\t\t\t<a class=\"SongListItem-linkTitle\" href=\"" + url + "\">" + title + "</a>\n\t\t\t\t\t<span class=\"SongListItem-subTitle\">\n\t\t\t\t\t\t<span class=\"SongListItem-points\">" + votes + " votes</span>\n\t\t\t\t\t\tuploaded by <span class=\"SongListItem-author\">" + user.username + "</span>\n\t\t\t\t\t\t<span class=\"SongListItem-time\">" + created + " hours ago</span>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>";
		}
	}]);

	return Link;
}();

exports.default = Link;