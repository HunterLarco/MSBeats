import React, { Component, PropTypes } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import Form from '../Form';
import FormRow from '../FormRow';
import Message from '../Message';
import Content from '../Content';
import { signupUser } from '../../actions';
// import cx from 'classnames';

const pageTitle = 'Sign up';

class SignupPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    signup: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { form: {}, rows: {} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.context.onSetTitle(pageTitle);
  }

  handleChange(e, form, rows) {
    console.log(form);
    this.setState({ form, rows });
  }

  handleSubmit(e, form, rows) {
    console.log('handleSubmit', form);
    this.setState({ form, rows });
    if (!form.isValid) return;
    const { dispatch } = this.props;
    dispatch(signupUser(rows.email.value, rows.username.value, rows.password.value));
  }

  render() {
    const { signup, form } = this.props;
    return (
      <div className="Inner">
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Content>
            <p>Only people part of the Make School 2 year program can sign up for now.</p>
          </Content>
          <FormRow attachToForm label="email" name="email" type="email">
            <Message attachToFormRow isFormSubmitted isEmpty>email is required</Message>
          </FormRow>
          <FormRow attachToForm label="username" name="username">
            <Message attachToFormRow isFormSubmitted isEmpty>username is required</Message>
          </FormRow>
          <FormRow attachToForm label="password" name="password" type="password">
            <Message attachToFormRow isFormSubmitted isEmpty>password is required</Message>
          </FormRow>
          {form && form.isSubmitted && !form.isChangedAfterSubmission && signup.errorMessage &&
            <Content><p>{signup.errorMessage}</p></Content>
          }
          <button className="Button Button--neutral Button--vertical-spacing" type="submit">Sign up</button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ signup }) {
  return { signup };
}

export default connect(mapStateToProps)(SignupPage);
