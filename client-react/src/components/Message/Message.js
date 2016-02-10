import React, { Component, PropTypes } from 'react';
import s from './Message.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import cx from 'classnames';

class Message extends Component {
  static propTypes = {
    state: PropTypes.object, // passed by the formRow
    isFormSubmitted: PropTypes.bool,
    isEmpty: PropTypes.bool,
    isNotEmpty: PropTypes.bool,
    isValid: PropTypes.bool,
    isNotValid: PropTypes.bool
  };

  isShown(state) {
    const { isFormSubmitted, isEmpty, isNotEmpty, isValid, isNotValid } = this.props;
    if (isFormSubmitted && !state.isFormSubmitted) return false;
    if (isEmpty && !state.isEmpty) return false;
    if (isNotEmpty && state.isEmpty) return false;
    if (isValid && !state.isValid) return false;
    if (isNotValid && state.isValid) return false;
    return true;
  }

  render() {
    const { state, children } = this.props;
    const isShown = this.isShown(state);
    if (isShown) {
      return (<div className={s.root}><div className={s.inner}>{children}</div></div>);
    }
    return false;
  }

}

export default withStyles(Message, s);
