import React, { Component, PropTypes } from 'react';
import s from './CommentFormPanel.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { createComment } from '../../actions';
import Form from '../Form';
import FormRow from '../FormRow';
import Message from '../Message';
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
  }

  handleSubmit(e, form, rows) {
    if (!form.isValid) return;
    const { dispatch, commentid, onSubmit } = this.props;
    dispatch(createComment(commentid, rows.commentText.value));
    if (onSubmit) onSubmit();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} ref="form" className="Pane Pane--well Form">
        <FormRow attachToForm textarea name="commentText" className={s.textarea}>
          <Message attachToFormRow isFormSubmitted isNotValid>Message is required</Message>
        </FormRow>
        <button className="Button Button--neutral" type="submit">Reply</button>
      </Form>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withStyles(CommentFormPanel, s));
