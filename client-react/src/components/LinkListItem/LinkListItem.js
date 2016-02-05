import React, { Component, PropTypes } from 'react';
import s from './LinkListItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux'
import { upvoteLink } from '../../actions'
import moment from 'moment';

class LinkListItem extends Component {

	static propTypes = {
		className: PropTypes.string,
		item: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	onClick(e) {
		e.preventDefault();
		const { dispatch } = this.props;
		const { linkid } = this.props.item;
		dispatch(upvoteLink(linkid));
	}

	render() {
		console.log(this.props.item);
		const { url, votes, title, user, created } = this.props.item;
		const fromNow = moment(created).fromNow();
		return (
			<div className={s.root}>
				<div className={s.index}>1.</div>
				<div className={s.upvoteContainer}>
					<a className={s.upvote} onClick={this.onClick.bind(this)}></a>
				</div>
				<div className={s.content}>
					<a className={s.linkTitle} href={url}>{title}</a>
					<small className={s.small}>(<a className={s.linkSource} href="/">wikipedia.com</a>)</small>
					<span className={s.subTitle}>
						<span className={s.points}>{votes} points</span>
						&nbsp;by <span className={s.author}>{user.username}</span>
						&nbsp;<span className={s.time}>{fromNow}</span>
					</span>
				</div>
			</div>
		);
	}

}

export default connect()(withStyles(LinkListItem, s));
