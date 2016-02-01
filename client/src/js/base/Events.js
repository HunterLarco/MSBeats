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
export default class Events {
	/**
	 * Create an events interface.
	 * Sets two properties on this instance
	 * @property {Map.<Function>} listeners
	 * @property {Array.<Function>} globalListeners
	 */
	constructor () {
		this.listeners = new Map();
		this.globalListeners = [];
	}

	/**
	 * Adds listener(s) to an event by key
	 * @param {*} key - name of the event
	 * @param {...Function} listeners - callbacks (...args) to call when the event is triggered
	 * @return this
	 */
	on (key, ...listeners) {
		if (this.listeners.has(key)) {
			const newListeners = this.listeners.get(key);
			newListeners.push(...listeners);
			this.listeners.set(key, newListeners);
		} else {
			this.listeners.set(key, [...listeners]);
		}
		return this;
	}

	/**
	 * Adds listener(s) to all events that will ever by triggered
	 * @param {...Function} listeners - callbacks (key, ...args) to call on all events triggered
	 * @return this
	 */
	onAll (...listeners) {
		this.globalListeners.push(...listeners);
		return this;
	}

	/**
	 * Remove listener(s) from an event by key
	 * Remove all listeners from an event if no listeners are passed
	 * @param {*} key - name of the events
	 * @param {...Function} listeners - callbacks to remove from the event
	 * @return this
	 */
	off (key, ...listeners) {
		if (!this.listeners.has(key)) return this;
		if (listeners) {
			// Only remove the listeners passed if any are passed
			this.listeners.set(key,
				this.listeners.get(key).filter((listener) => listeners.find((x) => x !== listener))
			);

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
	trigger (key, ...args) {
		this.globalListeners.forEach((listener) => listener(key, ...args));
		if (!this.listeners.has(key)) return this;
		this.listeners.get(key).forEach((listener) => listener(...args));
		return this;
	}
}
