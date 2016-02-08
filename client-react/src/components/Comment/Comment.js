import React, { Component, PropTypes } from 'react';
import s from './Comment.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import moment from 'moment';
import CommentFormPanel from '../CommentFormPanel';
import cx from 'classnames';

class Comment extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      isFormShown: false
    };
  }
  toggleReply(e) {
    e.preventDefault();
    this.setState({ isFormShown: !this.state.isFormShown });
  }

  render() {
    const { user, text, created, commentid, children } = this.props.item;
    const { isFormShown } = this.state;
    const createdAt = moment(created * 1000).fromNow();
    // children: Array[0]
    // commentid: 5277655813324800
    // created: 1454675892.045197
    // text: "Some reply"
    // user: Object
    // votes: 0
    return (
      <div className={s.root}>
        <div className={s.content}>
          <div className={s.header}>
            {`${user.username} ${createdAt}`}
          </div>
          <div className={s.body}>
            {text}
          </div>
          {isFormShown ? (
            <div>
              <CommentFormPanel commentid={commentid} />
              <small className={cx(s.reply, s.cancelReply)} onClick={this.toggleReply.bind(this)}>cancel reply</small>
            </div>
          ) : (
            <small className={s.reply} onClick={this.toggleReply.bind(this)}>reply</small>
          )}
        </div>

        <div className={s.children}>
          {children.map(comment => <Comment key={comment.commentid} item={comment} />)}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withStyles(Comment, s));
