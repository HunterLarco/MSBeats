// https://github.com/rackt/redux/blob/master/examples/async/store/configureStore.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { rootReducer } from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // TODO: figure out how to make the logger work
    // Related issue: https://github.com/fcomb/redux-logger/issues/11
    // applyMiddleware(thunkMiddleware, createLogger())
    applyMiddleware(thunkMiddleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
