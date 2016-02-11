"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing an events interface similar to EventEmitter/Backbone.Events
 * @author Jeroen Ransijn [@Jeroen_Ransijn]
 * @example
 * const events = new Events();
 *
 * events.on('change', (...args) => { console.log(args); });
 * events.trigger('change', 'firstArg', 'secondArg');
 * // Returns ['firstArg', 'secondArg']
 *
 * events.onAll((key, ...args) => { console.log(key, args); });
 * events.trigger('randomKey');
 * // Returns 'randomKey', ['firstArg', 'secondArg']
 */

var Events = function () {
	/**
  * Create an events interface.
  * Sets two properties on this instance
  * @property {Map.<Array[Function]>} listeners
  * @property {Array.<Function>} globalListeners
  */

	function Events() {
		_classCallCheck(this, Events);

		this.listeners = new Map();
		this.globalListeners = [];
	}

	/**
  * Adds listener(s) to an event by key
  * @param {*} key - name of the event
  * @param {...Function} listeners - callbacks (...args) to call when the event is triggered
  * @return this
  */


	_createClass(Events, [{
		key: "on",
		value: function on(key) {
			for (var _len = arguments.length, listeners = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				listeners[_key - 1] = arguments[_key];
			}

			if (this.listeners.has(key)) {
				var newListeners = this.listeners.get(key);
				newListeners.push.apply(newListeners, listeners);
				this.listeners.set(key, newListeners);
			} else {
				this.listeners.set(key, [].concat(listeners));
			}
			return this;
		}

		/**
   * Adds listener(s) to all events that will ever by triggered
   * @param {...Function} listeners - callbacks (key, ...args) to call on all events triggered
   * @return this
   */

	}, {
		key: "onAll",
		value: function onAll() {
			var _globalListeners;

			(_globalListeners = this.globalListeners).push.apply(_globalListeners, arguments);
			return this;
		}

		/**
   * Remove listener(s) from an event by key
   * Remove all listeners from an event if no listeners are passed
   * @param {*} key - name of the events
   * @param {...Function} listeners - callbacks to remove from the event
   * @return this
   */

	}, {
		key: "off",
		value: function off(key) {
			for (var _len2 = arguments.length, listeners = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				listeners[_key2 - 1] = arguments[_key2];
			}

			if (!this.listeners.has(key)) return this;
			if (listeners) {
				// Only remove the listeners passed if any are passed
				this.listeners.set(key, this.listeners.get(key).filter(function (listener) {
					return listeners.find(function (x) {
						return x !== listener;
					});
				}));

				if (this.listeners.get(key).length === 0) {
					// Remove the key if there are no more listeners
					this.listeners.delete(key);
				}
			} else {
				this.listeners.delete(key);
			}
			return this;
		}

		/**
   * Trigger all listener(s) for an events
   * @param {*} key - name of the event
   * @param {...*} args - arguments to be applied on the listeners
   * @return this
   */

	}, {
		key: "trigger",
		value: function trigger(key) {
			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			this.globalListeners.forEach(function (listener) {
				return listener.apply(undefined, [key].concat(args));
			});
			if (!this.listeners.has(key)) return this;
			this.listeners.get(key).forEach(function (listener) {
				return listener.apply(undefined, args);
			});
			return this;
		}
	}]);

	return Events;
}();

exports.default = Events;