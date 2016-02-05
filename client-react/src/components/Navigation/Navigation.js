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

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { auth } = this.props;
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <Link className={s.link} to="submit">submit</Link>
        {!auth.isAuthenticated ? (
          <span>
            <span className={s.middot}>&middot;</span>
            <Link className={s.link} to="login">login</Link>
          </span>
        ) : null }
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
