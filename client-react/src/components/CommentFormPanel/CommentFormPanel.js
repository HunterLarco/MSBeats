import React, { Component, PropTypes } from 'react';
import s from './CommentFormPanel.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { createComment } from '../../actions';
// import cx from 'classnames';

class CommentFormPanel extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commentid: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.state = {
      commentText: ''
    };
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ commentText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, commentid } = this.props;
    const { commentText } = this.state;
    if (commentText) {
      dispatch(createComment(commentid, commentText))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} ref="form" className="Pane Pane--well Form">
        <div className="Form-inner">
          <textarea className={s.textarea} onChange={this.onChange.bind(this)}></textarea>
          <button className="Button Button--neutral" type="submit">Reply</button>
        </div>
      </form>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withStyles(CommentFormPanel, s));
