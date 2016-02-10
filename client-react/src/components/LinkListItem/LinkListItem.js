import React, { Component, PropTypes } from 'react';
import s from './LinkListItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux'
import { upvoteLink } from '../../actions'
import moment from 'moment';
import cx from 'classnames';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';
import Content from '../Content';

class LinkListItem extends Component {

	static propTypes = {
		className: PropTypes.string,
		item: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		showText: PropTypes.bool
	};

	constructor() {
		super();
		this.state = {
			isUpvoted: false,
			isUpvotedButNotReloaded: false
		};
		this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
	}

	componentWillMount() {
		this.setState({ isUpvoted: this.props.item.voteStatus === 1 });
	}

	handleUpvoteClick(e) {
		e.preventDefault();
		if (this.state.isUpvoted) return;
		const { dispatch } = this.props;
		const { linkid } = this.props.item;
		this.setState({ isUpvoted: true });
		this.setState({ isUpvotedButNotReloaded: true });
		dispatch(upvoteLink(linkid));
	}

	safeTitle(title) {
		return title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
	}

	render() {
		console.log('(LinkListItem) this.props.item', this.props.item);
		// return (<div></div>);
		if (isEmpty(this.props.item)) { // eslint-disable-line
			console.log('(LinkListItem) skeleton loading');
			return (
				<div className={s.root}>
					<div className={s.index}></div>
					<div className={s.upvoteContainer}>
						<span className={s.upvote}></span>
					</div>
					<div className={s.content}>
						<a className={s.linkTitle}>
							Loading...
						</a>
						<span className={s.subTitle}>
							by <span className={s.author}>notarealaccount</span>
						&nbsp;<span className={s.time}>loading</span> &middot;&nbsp;
							<Link className={s.commentLink}>0&nbsp;comments</Link>
						</span>
					</div>
				</div>
			);
		}

		const { showText } = this.props;
		const { url, votes, title, user, created, rank, linkid, commentsCount, text } = this.props.item;
		const commentLink = `${linkid}/${this.safeTitle(title)}`;
		const isVoteActive = this.state.isUpvoted ? 'is-active' : '';
		const fromNow = moment(created * 1000).fromNow();
		return (
			<div>
				<div className={s.root}>
					<div className={s.index}>
						{rank &&
							`${rank}.`
						}
					</div>
					<div className={s.upvoteContainer}>
						<span className={cx(s.upvote, isVoteActive)} onClick={this.handleUpvoteClick} title={this.state.isUpvoted ? 'upvoted' : 'upvote'}>{this.state.isUpvotedButNotReloaded ? votes + 1 : votes}</span>
					</div>
					<div className={s.content}>
						{url ?
							<a className={s.linkTitle} href={url}>
								{rank &&
									<span className={s.titleIndex}>{rank}. </span>
								}
								{title}
							</a>
							:
							<Link className={s.linkTitle} to={commentLink}>
								{rank &&
									<span className={s.titleIndex}>{rank}. </span>
								}
								{title}
							</Link>
						}

						<span className={s.subTitle}>
							by <span className={s.author}>{user && user.username}</span>
						&nbsp;<span className={s.time}>{fromNow}</span> &middot;&nbsp;
							<Link className={s.commentLink} to={commentLink}>{commentsCount}&nbsp;comments</Link>
						</span>
					</div>
				</div>
				{showText &&
					<div className="Pane">
						<Content>
							<p>{text}</p>
						</Content>
					</div>
				}
			</div>
		);

		// <small className={s.small}>(<a className={s.linkSource} href="/">wikipedia.com</a>)</small>
	}

}

export default connect()(withStyles(LinkListItem, s));
