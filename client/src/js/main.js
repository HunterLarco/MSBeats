import { $ } from './helpers/dom';
import LinkCollection from './components/LinkCollection';
import Links from './api/LinksApiEndpoint';

function main () {
	const $links = $('.js-LinkCollection');

	Links.get().then(({ links }) => {
		$links.innerHTML = new LinkCollection(links).render();
	});
}

main();
