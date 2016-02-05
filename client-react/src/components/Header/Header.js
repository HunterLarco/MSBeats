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
import { IndexLink } from 'react-router';
import Navigation from '../Navigation';

class Header extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.content}>
          <IndexLink className={s.title} to="/">
            <span>Make School News</span>
          </IndexLink>
          <Navigation />
        </div>
      </div>
    );
  }

}

export default withStyles(Header, s);
