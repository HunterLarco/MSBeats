import React, { Component, PropTypes } from 'react';
import s from './LinkListItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux'
import { upvoteLink } from '../../actions'
import moment from 'moment';
import cx from 'classnames';
import { Link } from 'react-router';

class LinkListItem extends Component {

	static propTypes = {
		className: PropTypes.string,
		item: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = {
			isUpvoted: false
		};
	}

	componentWillMount() {
		this.setState({ isUpvoted: this.props.item.voteStatus === 1 });
	}

	onClick(e) {
		e.preventDefault();
		const { dispatch } = this.props;
		const { linkid } = this.props.item;
		this.setState({ isUpvoted: true });
		dispatch(upvoteLink(linkid));
	}

	render() {
		console.log(this.props.item);
		const { url, votes, title, user, created, voteStatus, rank, linkid } = this.props.item;
		const commentLink = `/comments/${linkid}`
		const isVoteActive = this.state.isUpvoted ? 'is-active' : '';
		const fromNow = moment(created * 1000).fromNow();
		return (
			<div className={s.root}>
				<div className={s.index}>{rank}.</div>
				<div className={s.upvoteContainer}>
					<span className={cx(s.upvote, isVoteActive)} onClick={this.onClick.bind(this)}></span>
				</div>
				<div className={s.content}>
					<a className={s.linkTitle} href={url}>{title}</a>
					<span className={s.subTitle}>
						<span className={s.points}>{votes} points</span>
						&nbsp;by <span className={s.author}>{user.username}</span>
						&nbsp;<span className={s.time}>{fromNow}</span>
					&nbsp;<Link className={s.commentLink} to={commentLink}>comments</Link>
					</span>
				</div>
			</div>
		);

		// <small className={s.small}>(<a className={s.linkSource} href="/">wikipedia.com</a>)</small>
	}

}

export default connect()(withStyles(LinkListItem, s));
