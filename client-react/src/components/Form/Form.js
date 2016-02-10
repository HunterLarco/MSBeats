import React, { Component, PropTypes, Children, cloneElement } from 'react';
import s from './Form.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
// import cx from 'classnames';

class Form extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.node
  };

  constructor() {
    super();
    this.state = {
      isSubmitted: false
    };
    this.formRows = {};
    this.attachHandler = this.attachHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getState(options) {
    var rows = {};

    for (const key in this.formRows) {
      if (this.formRows.hasOwnProperty(key)) {
          rows[key] = this.formRows[key].state;
      }
    }

    const validation = _.reduce(rows, (result, value) => {
      return {
        isEmpty: !(result.isEmpty && value.isEmpty),
        isValid: (result.isValid && value.isValid),
        isPristine: !(!result.isPristine || !value.isPristine)
      }
    });

    const form = Object.assign({}, validation, options);

    return {
      form,
      rows
    };
  }

  attachHandler(component) {
    this.formRows[component.props.name] = component;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, rows } = this.getState({
      isSubmitted: true,
      isChangedAfterSubmission: false
    });
    console.log('handleSubmit', form);
    this.setState(form, () => {
      if (this.props.onSubmit) this.props.onSubmit(e, form, rows);
    });
  }

  handleChange(e) {
    const isSubmitted = !!this.state.isSubmitted;
    const { form, rows } = this.getState({
      isSubmitted,
      isChangedAfterSubmission: isSubmitted
    });
    this.setState(form, () => {
      if (this.props.onChange) this.props.onChange(e, form, rows);
    });
  }

  renderChildren(children) {
    return Children.map(children, (child) => {
      if (child && child.props.attachToForm) {
        return cloneElement(child, {
          isFormSubmitted: this.state.isSubmitted,
          attachHandler: this.attachHandler,
          changeHandler: this.handleChange
        });
      }
      return child
    });
  }

  render() {
    console.log('(Form) render()');
    return (
      <form method="post" onSubmit={this.handleSubmit} onChange={this.handleChange} className="Pane Pane--well Form">
        <div className="Form-inner">
          {this.renderChildren(this.props.children)}
        </div>
      </form>
    );
  }

}

export default withStyles(Form, s);
