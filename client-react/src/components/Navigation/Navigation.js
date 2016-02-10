/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { browserHistory } from 'react-router';

class Navigation extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    className: PropTypes.string,
    auth: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (browserHistory) {
      browserHistory.listen(() => {
        this.forceUpdate();
      });
    }
  }

  componentWillReceiveProps() {
    this.setState({ random: new Date() });
  }

  handleLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { auth } = this.props;
    // For some reason activeClassName doesn't work for this on the client
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <span className={s.left}>
          <Link className={s.link} to="/submit" activeClassName={s.linkActive}>submit</Link>
        </span>
        <span className={s.right}>
          {!auth.isAuthenticated ? (
            <span>
              <Link className={s.link} to="/signup" activeClassName={s.linkActive}>signup</Link>
            </span>
          ) : (
            <span>
              <Link className={s.link} to="user">John Doe</Link>
              <span className={s.middot}>&middot;</span>
              <Link className={s.link} to="" onClick={this.handleLogout}>logout</Link>
            </span>
          )}
        </span>
      </div>
    );
  }

}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(withStyles(Navigation, s));
