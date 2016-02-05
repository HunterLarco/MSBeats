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
import { loginUser } from '../../actions'
import { connect } from 'react-redux'
import FormRow from '../FormRow'
import Content from '../Content'

const title = 'Log In';

class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(loginUser(this.state.username, this.state.password))
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div className={s.root}>
        <form onSubmit={this.handleSubmit.bind(this)} className='Pane Pane--well Form'>
          <div className='Form-inner'>
            <FormRow label='username/email' name='title' onChange={this.handleUsernameChange.bind(this)} />
            <FormRow label='password' name='url' type='password' onChange={this.handlePasswordChange.bind(this)} />
            <button className='Button Button--neutral' type='submit'>Login</button>
          </div>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log(state)
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withStyles(LoginPage, s));
