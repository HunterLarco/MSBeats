import React, { Component, PropTypes } from 'react';
import s from './FormRow.scss';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class FormRow extends Component {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };

  render() {
    const { className, label, name } = this.props
    const type = this.props.type || 'text'
    return (
      <div className={cx(s.root, className)}>
        <div className={s.side}>
          <label htmlFor={name}>{label}</label>
        </div>
        <div className={s.main}>
          <input id={name} name={name} className={s.input} type={type} onChange={this.props.onChange} />
        </div>
      </div>
    );
  }

}

export default withStyles(FormRow, s);
