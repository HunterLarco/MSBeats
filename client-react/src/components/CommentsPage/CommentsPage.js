import React, { Component, PropTypes } from 'react';
import s from './CommentsPage.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchComments, invalidateComments } from '../../actions';
import LinkListItem from '../LinkListItem';
import Comment from '../Comment';
import Content from '../Content';
import LoginPage from '../LoginPage';
import CommentFormPanel from '../CommentFormPanel';
import { isEmpty } from 'lodash';

class CommentsPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    linkWithComments: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    router: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      commentText: ''
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(invalidateComments());
  }

  componentDidMount() {
    const { dispatch, auth, params, linkWithComments } = this.props;
    if (auth.isAuthenticated) {
      dispatch(fetchComments(params.linkid));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.linkWithComments.data)) {
      this.context.onSetTitle(nextProps.linkWithComments.data.title);
    }
  }

  render() {
    const { auth, linkWithComments } = this.props;
    const { commentrootid } = linkWithComments.data;
    if (!auth.isAuthenticated) {
      return (
        <div>
          <div className="Pane Inner">
            <Content>
              <p>You have to be logged in to see this</p>
            </Content>
          </div>
          <LoginPage />
        </div>
      )
    }

    const comments = linkWithComments.data.comments || [];
    return (
      <div className="Inner">
        <header className={s.header}>
          <LinkListItem showText="true" item={linkWithComments.data} />
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
