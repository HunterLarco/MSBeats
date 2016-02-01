import { expect } from 'chai';
import Events from '../src/js/base/Events';

describe('Events', () => {
	const events = new Events();

	var stringData;
	const stringKey = 'stringKey';
	const stringKeyListener = (data) => {
		// Set a state we can confirm
		stringData = data
	};

	const symbolKey = Symbol('symbolKey');
	const symbolKeyListener = () => {};

	const objectKey = { random: 'contents' };

	it('creates two instance properties', () => {
		expect(events.listeners).to.be.a('map');
		expect(events.globalListeners).to.be.a('array');
	});

	it('can add a listener with a string as a key', () => {
		events.on(stringKey, stringKeyListener);
		expect(events.listeners.has(stringKey)).to.be.true;
	});

	it('can add a listener with a symbol as a key', () => {
		events.on(symbolKey, symbolKeyListener);
		expect(events.listeners.has(symbolKey)).to.be.true;
	});

	it('can add a listener with an object as a key', () => {
		const listener = () => {};
		events.on(objectKey, listener);
		expect(events.listeners.has(objectKey)).to.be.true;
	});

	it('can add another listener for a key', () => {
		events.on(stringKey, () => {});
		expect(events.listeners.get(stringKey)).to.be.a('array');
		expect(events.listeners.get(stringKey).length).to.equal(2);
	});

	it('can add and trigger a global listener with onAll', () => {
		var outerState = false;
		var outerParam1;
		var outerParam2;

		const randomParam1Value = 'randomParam1';
		const randomParam2Value = 'randomParam2';
		const listener = (eventName, ...args) => {
			outerState = true;
			outerParam1 = args[0];
			outerParam2 = args[1];
		};

		events.onAll(listener);
		events.trigger('randomKey', randomParam1Value, randomParam2Value);

		expect(outerState).to.be.true;
		expect(outerParam1).to.equal(randomParam1Value);
		expect(outerParam2).to.equal(randomParam2Value);
	});

	it('can trigger a listener', () => {
		const data = { isHere: true };
		events.trigger(stringKey, data);
		expect(stringData).to.equal(data);
	});

});
