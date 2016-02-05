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
import { connect } from 'react-redux';
import { fetchLinksIfNeeded, selectLinksFilter } from '../../actions';
import LoginPage from '../LoginPage';
import Content from '../Content';
import { Link } from 'react-router';

const title = 'News'

class HomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    selectedLinksFilter: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    router: PropTypes.object
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    const { dispatch, selectedLinksFilter, auth } = this.props
    if (auth.isAuthenticated) {
        dispatch(fetchLinksIfNeeded(selectedLinksFilter));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedLinksFilter !== this.props.selectedLinksFilter) {
      const { dispatch, selectedLinksFilter } = nextProps;
      dispatch(fetchLinksIfNeeded(selectedLinksFilter));
    }
  }

  render() {
    const { items, auth, isFetching } = this.props;

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
        <div className={s.filter}>
          <Link className={s.filterLink} to="top">top</Link>
          <Link className={s.filterLink} to="trending">trending</Link>
          <Link className={s.filterLink} to="new">new</Link>
        </div>
        {isFetching && items.length === 0 &&
          <Content>
            <p>Loading...</p>
          </Content>
        }
        {items.map((item) => <LinkListItem key={item.linkid} item={item} />)}
      </div>
    );
  }

}

function mapStateToProps({ linksByFilter, selectedLinksFilter, auth }) {
  const {
    isFetching,
    items
  } = linksByFilter[selectedLinksFilter] || {
    isFetching: true,
    items: []
  }

  return {
    isFetching,
    items,
    selectedLinksFilter,
    auth
  }
}

export default connect(mapStateToProps)(withStyles(HomePage, s));
