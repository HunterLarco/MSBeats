/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import assets from './assets';
import { port } from './config';
import routes from './routes';
import ContextHolder from './core/ContextHolder';
import Html from './components/Html';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import cookieParser from 'cookie-parser';
import reactCookie from 'react-cookie';

const server = global.server = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content').default);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    const store = configureStore();
    match({ routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        throw error;
      }
      if (redirectLocation) {
        const redirectPath = `${ redirectLocation.pathname }${ redirectLocation.search }`;
        res.redirect(302, redirectPath);
        return;
      }
      let statusCode = 200;
      const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
      const css = [];
      const context = {
        insertCss: styles => css.push(styles._getCss()),
        onSetTitle: value => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => statusCode = 404
      };
      reactCookie.plugToRequest(req, res);
      data.body = ReactDOMServer.renderToString(
        <Provider store={store}>
          <ContextHolder context={context}>
            <RouterContext {...renderProps}/>
          </ContextHolder>
        </Provider>
      );
      data.css = css.join('');
      const initialState = store.getState();
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />);
      res.status(statusCode).send(`<!doctype html>\n${html}
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>`);
    });
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
