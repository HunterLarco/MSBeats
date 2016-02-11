/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import cx from 'classnames';
import { IndexLink } from 'react-router';
import Navigation from '../Navigation';

class Header extends Component {
  // WalkMe logo
  // <img className={s.logoWalkme} src={require('./walkme.png')}></img>
  render() {
    return (
      <div className={cx(s.root, 'Pane Inner')}>
        <div className={s.content}>
          <IndexLink className={s.title} to="/top">
            <img className={s.logo} src={require('./logo.svg')}></img>
            <span>Make School News</span>
          </IndexLink>
          <Navigation />
        </div>
      </div>
    );
  }

}

export default withStyles(Header, s);
