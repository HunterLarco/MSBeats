"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$ = $;
exports.$$ = $$;
function $() {
	var _document;

	return (_document = document).querySelector.apply(_document, arguments);
}

function $$() {
	var _document2;

	return (_document2 = document).querySelectorAll.apply(_document2, arguments);
}