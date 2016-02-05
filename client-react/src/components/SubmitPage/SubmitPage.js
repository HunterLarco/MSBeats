/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SubmitPage.scss'
import cx from 'classnames'
import { connect } from 'react-redux'
import FormRow from '../FormRow'
import Content from '../Content'
import Location from '../../core/Location'
import LoginPage from '../LoginPage'

const title = 'Submit'

class SubmitPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('handleSubmit', this);
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <div>
          <Content>
            <p>You have to be Logged in to submit</p>
          </Content>
          <LoginPage />
        </div>
      )
    }
    return (
      <div className={s.root}>
        <form onSubmit={this.handleSubmit} ref="form" className="Pane Pane--well Form">
          <div className="Form-inner">
            <FormRow label="title" name="title" />
            <FormRow label="url" name="url" />
            <Content>
              <p>Only people who are part of this organization can see your post.</p>
            </Content>
            <button className="Button Button--neutral" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withStyles(SubmitPage, s));
