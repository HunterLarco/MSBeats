import React, { Component, PropTypes, Children, cloneElement } from 'react';
import s from './Form.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import cx from 'classnames';

class Form extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  constructor() {
    super();
    this.state = {
      isFormSubmitted: false
    };
    this.attachHandler = this.attachHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRows = {};
  }

  handleSubmit(e) {
    var rows = {};
    e.preventDefault();
    console.log('this.formRows', this, this.formRows);

    for (const key in this.formRows) {
      if (this.formRows.hasOwnProperty(key)) {
          rows[key] = this.formRows[key].state;
      }
    }

    this.setState(Object.assign({
      isFormSubmitted: true
    }, Object.keys(this.formRows).reduce((prevKey, currentKey) => {
      const prev = this.formRows[prevKey].state;
      const current = this.formRows[currentKey].state;
      return {
        isEmpty: !(prev.isEmpty && current.isEmpty),
        isValid: (prev.isValid && current.isValid),
        isPristine: !(!prev.isPristine || !current.isPristine)
      };
    })), () => {
      this.props.onSubmit(e, this.state, rows);
    });
  }

  attachHandler(component) {
    this.formRows[component.props.name] = component;
  }

  renderChildren(children) {
    return Children.map(children, (child) => {
      if (child.props.attachToForm) {
        return cloneElement(child, {
          isFormSubmitted: this.state.isFormSubmitted,
          attachHandler: this.attachHandler
        });
      }
      return child
    });
  }

  render() {
    console.log('(Form) render()');
    return (
      <form onSubmit={this.handleSubmit} className="Pane Pane--well Form">
        <div className="Form-inner">
          {this.renderChildren(this.props.children)}
        </div>
      </form>
    );
  }

}

export default withStyles(Form, s);
