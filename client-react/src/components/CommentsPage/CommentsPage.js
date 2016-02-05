import React, { Component, PropTypes } from 'react';
import s from './CommentsPage.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';

class CommentsPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, auth, params } = this.props;
    if (auth.isAuthenticated) {
      dispatch(fetchComments(params.linkid));
    }
   }

  render() {
    return (
      <div></div>
    );
  }

}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(withStyles(CommentsPage, s));
