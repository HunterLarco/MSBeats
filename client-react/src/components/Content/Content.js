import React, { Component, PropTypes } from 'react';
import s from './Content.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Content extends Component {

  render() {
    return (
      <div className={s.root}>{ this.props.children }</div>
    );
  }

}

export default withStyles(Content, s);
