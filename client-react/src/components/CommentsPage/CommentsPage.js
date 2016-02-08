import React, { Component, PropTypes } from 'react';
import s from './CommentsPage.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';
import LinkListItem from '../LinkListItem';
import Comment from '../Comment';
import Content from '../Content';
import LoginPage from '../LoginPage';
import CommentFormPanel from '../CommentFormPanel';

class CommentsPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    linkWithComments: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      commentText: ''
    };
  }

  componentDidMount() {
    const { dispatch, auth, params } = this.props;
    if (auth.isAuthenticated) {
      dispatch(fetchComments(params.linkid));
    }
  }

  render() {
    const { auth, linkWithComments } = this.props;
    const { commentrootid } = linkWithComments.data;
    if (!auth.isAuthenticated) {
      return (
        <div>
          <div className="Inner">
            <Content>
              <p>You have to be logged in to see this</p>
            </Content>
          </div>
          <LoginPage />
        </div>
      )
    }

    console.log(linkWithComments.data);
    const comments = linkWithComments.data.comments || [];
    console.log(comments);
    // return (<div></div>);
    return (
      <div className="Inner">
        <header className={s.header}>
          {linkWithComments.data.linkid ? (
            <LinkListItem item={linkWithComments.data} />
          ) : null}
        </header>
        <CommentFormPanel commentid={commentrootid} />
        <div className={s.comments}>
          {comments.map(comment => <Comment key={comment.commentid} item={comment} />)}
        </div>
      </div>
    );
  }

}

function mapStateToProps({ auth, linkWithComments }) {
  return {
    auth,
    linkWithComments
  };
}

export default connect(mapStateToProps)(withStyles(CommentsPage, s));
