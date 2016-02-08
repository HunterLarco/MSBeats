/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';
import { loginUser } from '../../actions';
import { connect } from 'react-redux';
import Form from '../Form';
import FormRow from '../FormRow';
import Message from '../Message';
import cx from 'classnames';

const title = 'Log In';

class LoginPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  handleSubmit(e, form, rows) {
    debugger;
    if (!form.isValid) return;
    const { dispatch } = this.props;
    dispatch(loginUser(rows.usernameoremail.value, rows.password.value));
  }

  render() {
    return (
      <div className={cx(s.root, 'Inner')}>
        <Form onSubmit={this.handleSubmit}>
          <FormRow attachToForm label="username/email" name="usernameoremail">
            <Message attachToFormRow isFormSubmitted isEmpty>username/email is required</Message>
          </FormRow>
          <FormRow attachToForm label="password" name="password" type="password">
            <Message attachToFormRow isFormSubmitted isEmpty>password is required</Message>
          </FormRow>
          <button className="Button Button--neutral" type="submit">Login</button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(withStyles(LoginPage, s));
