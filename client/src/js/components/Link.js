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
export default class Link {
	constructor (props = {}) {
		this.props = props;
	}

	render () {
		const { created, user, title, votes, linkid, url } = this.props;
		return `<div class="Pane SongListItem">
				<div class="SongListItem-buttons">
					<a class="SongListItem-upvote"></a>
					<a class="SongListItem-downvote"></a>
				</div>
				<div class="SongListItem-content">
					<a class="SongListItem-linkTitle" href="${url}">${title}</a>
					<span class="SongListItem-subTitle">
						<span class="SongListItem-points">${votes} votes</span>
						uploaded by <span class="SongListItem-author">${user.username}</span>
						<span class="SongListItem-time">${created} hours ago</span>
					</span>
				</div>
			</div>`;
	}
}
