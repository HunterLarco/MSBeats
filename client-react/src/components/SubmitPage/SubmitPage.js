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
import s from './SubmitPage.scss';
// import cx from 'classnames';
import { connect } from 'react-redux';
import FormRow from '../FormRow';
import Content from '../Content';
import LoginPage from '../LoginPage';
import { submitLink } from '../../actions';
import Message from '../Message';
import Form from '../Form';

const pageTitle = 'Submit';

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
    this.state = {
      title: '',
      url: '',
      isFormSubmitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.context.onSetTitle(pageTitle);
  }

  handleSubmit(e, form, rows) {
    if (!form.isValid) return;
    const { dispatch } = this.props;
    dispatch(submitLink(rows.title.value, rows.url.value));
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <div>
          <div className="Inner">
            <Content>
              <p>You have to be logged in to submit</p>
            </Content>
          </div>
          <LoginPage />
        </div>
      )
    }

    return (
      <div className="Inner">
        <div className={s.root}>
          <Form onSubmit={this.handleSubmit}>
            <FormRow attachToForm minLength="5" label="title" name="title">
              <Message attachToFormRow isFormSubmitted isEmpty>title is required</Message>
              <Message attachToFormRow isFormSubmitted isNotEmpty isNotValid>Title needs to be at least 5 characters long</Message>
            </FormRow>
            <FormRow attachToForm label="url" name="url" type="url">
              <Message attachToFormRow isFormSubmitted isEmpty>url is required</Message>
            </FormRow>
            <Content>
              <p>Only people who are part of this organization can see your post.</p>
            </Content>
            <button className="Button Button--neutral" type="submit">Submit</button>
          </Form>
        </div>
      </div>
    );
  }

}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(withStyles(SubmitPage, s));
