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
import s from './Footer.scss';
import cx from 'classnames';

class Footer extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={cx(s.inner, 'Inner')}>
          <span className={s.text}>Powered by the Make Mansion</span>
        </div>
      </div>
    );
  }

}

export default withStyles(Footer, s);
