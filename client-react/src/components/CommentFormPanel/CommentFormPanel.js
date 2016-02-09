import React, { Component, PropTypes } from 'react';
import s from './CommentFormPanel.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { createComment } from '../../actions';
// import cx from 'classnames';

class CommentFormPanel extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commentid: PropTypes.number.isRequired,
    onSubmit: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      commentText: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ commentText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, commentid, onSubmit } = this.props;
    const { commentText } = this.state;
    if (commentText) {
      dispatch(createComment(commentid, commentText))
    }
    if (onSubmit) onSubmit();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} ref="form" className="Pane Pane--well Form">
        <div className="Form-inner">
          <textarea className={s.textarea} onChange={this.handleChange}></textarea>
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
