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
import s from './HomePage.scss';
import LinkListItem from '../LinkListItem';
import { connect } from 'react-redux'
import { fetchLinksIfNeeded } from '../../actions'
import LoginPage from '../LoginPage'
import Content from '../Content'

const title = 'News'

class HomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchLinksIfNeeded())
  }

  render() {
    const { items, auth } = this.props;
    if (!auth.isAuthenticated) {
      return (
        <div>
          <Content>
            <p>You have to be logged in to see the news</p>
          </Content>
          <LoginPage />
        </div>
      )
    }

    return (
      <div className={s.root}>
        {items.map((item) => <LinkListItem item={item} />)}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    items: state.links.items,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withStyles(HomePage, s));
