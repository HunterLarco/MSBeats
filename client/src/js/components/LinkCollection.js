import Link from './Link';

export default class LinkCollection {
	constructor (props = {}) {
		this.props = props;
		this.children = this.props.map((link) => new Link(link));
	}

	render () {
		return this.children.map((child) => child.render()).join('');
	}
}
