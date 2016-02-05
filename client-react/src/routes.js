/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
import SubmitPage from './components/SubmitPage';
import NotFoundPage from './components/NotFoundPage';
import * as ActionTypes from './actions';

async function getContextComponent(location, callback) {
  const response = await fetch(`/api/content?path=${location.pathname}`);
  const content = await response.json();
  // using an arrow to pass page instance instead of page class; cb accepts class by default
  callback(null, () => <ContentPage {...content} />);
}

export default function routes (store) {
  function setFilter(filter) {
    store.dispatch(ActionTypes.selectLinksFilter(filter));
  }
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRedirect to='top' />
        <Route path="top" component={HomePage} onEnter={setFilter.bind(null, 'top')} />
        <Route path="trending" component={HomePage} onEnter={setFilter.bind(null, 'trending')} />
        <Route path="new" component={HomePage} onEnter={setFilter.bind(null, 'new')} />
        <Route path="mine" component={HomePage} onEnter={setFilter.bind(null, 'mine')} />
        <Route path="submit" component={SubmitPage} />
        <Route path="about" getComponent={getContextComponent} />
        <Route path="privacy" getComponent={getContextComponent} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
}
