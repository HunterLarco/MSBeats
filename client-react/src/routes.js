/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
import SubmitPage from './components/SubmitPage';
import NotFoundPage from './components/NotFoundPage';
import CommentsPage from './components/CommentsPage';
import * as actions from './actions';

async function getContextComponent(location, callback) {
  const response = await fetch(`/api/content?path=${location.pathname}`);
  const content = await response.json();
  // using an arrow to pass page instance instead of page class; cb accepts class by default
  callback(null, () => <ContentPage {...content} />);
}

export default function routes (store) {
  var filters = {};

  ['top', 'trending', 'new', 'min'].forEach((key) => filters[key] = (nextState) => {
    store.dispatch(actions.selectLinksFilter(key, nextState.params.page));
  });

  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRedirect to="top" />
        <Route path="top" component={HomePage} onEnter={filters.top}>
          <Route path=":page" component={HomePage} onEnter={filters.top} />
        </Route>
        <Route path="trending" component={HomePage} onEnter={filters.trending}>
          <Route path=":page" component={HomePage} onEnter={filters.tending} />
        </Route>
        <Route path="new" component={HomePage} onEnter={filters.new}>
          <IndexRoute component={HomePage} onEnter={filters.new} />
          <Route path=":page" component={HomePage} onEnter={filters.new} />
        </Route>
        <Route path="mine" component={HomePage} onEnter={filters.mine}>
          <IndexRoute component={HomePage} onEnter={filters.mine} />
          <Route path=":page" component={HomePage} onEnter={filters.mine} />
        </Route>
        <Route path="submit" component={SubmitPage} />
        <Route path="about" getComponent={getContextComponent} />
        <Route path="privacy" getComponent={getContextComponent} />
        <Route path="comments/:linkid" component={CommentsPage} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
}
