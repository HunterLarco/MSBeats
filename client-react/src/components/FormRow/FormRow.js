import React, { Component, PropTypes, Children, cloneElement } from 'react';
import s from './FormRow.scss';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class FormRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string,
    children: PropTypes.node,
    minLength: PropTypes.string, // parsed to int
    attachToForm: PropTypes.bool,
    attachHandler: PropTypes.func,
    isFormSubmitted: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      isValid: false,
      isPristine: true,
      isFormSubmitted: null,
      isEmpty: true
    };
    this.messages = [];
  }

  componentDidMount() {
    if (this.props.attachHandler) {
      this.props.attachHandler(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isFormSubmitted: nextProps.isFormSubmitted
    });
  }

  /**
   * The event object is augmented to validation information
   */
  onChange(e) {
    const { isFormSubmitted } = this.props;
    this.setState({
      value: e.target.value,
      isValid: this.validate(e.target.value),
      isPristine: false,
      isFormSubmitted,
      isEmpty: e.target.value === ''
    });
  }

  validate(value) {
    const { minLength } = this.props;
    const minLengthNumber = minLength ? parseInt(minLength, 10) : 0;
    if (minLengthNumber && value.length < minLengthNumber) return false;
    return true;
  }

  renderChildren(children) {
    const newChildren = Children.map(children, (child) => {
      if (child.props.attachToFormRow) {
        return cloneElement(child, {
          state: this.state
        });
      }
    });
    return newChildren;
  }

  render() {
    // console.log('render FormRow');
    const { className, label, name } = this.props
    const type = this.props.type || 'text'
    return (
      <div className={cx(s.root, className)}>
        <div className={s.side}>
          <label htmlFor={name}>{label}</label>
        </div>
        <div className={s.main}>
          <input ref="input" id={name} name={name} className={s.input} type={type} onChange={this.onChange.bind(this)} />
        </div>
        <div className={s.messages}>
          {this.renderChildren(this.props.children)}
        </div>
      </div>
    );
  }

}

export default withStyles(FormRow, s);
