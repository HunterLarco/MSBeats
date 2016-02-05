import * as ActionTypes from '../actions'
// import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import reactCookie from 'react-cookie';

function isHeaderSearchFocused (state = false, action) {
  switch (action.type) {
    case ActionTypes.SET_HEADER_SEARCH_FOCUS:
      return action.isFocused
    default:
      return state
  }
}

function links (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case ActionTypes.INVALIDATE_LINKS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case ActionTypes.REQUEST_LINKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_LINKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
      });
    default:
      return state
  }
}

function getUserFromStorage() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

function auth (state = {
  isFetching: false,
  isAuthenticated: !!reactCookie.load('loginid'),
  user: canUseDOM ? getUserFromStorage() : null
}, action) {
  console.log('login', state, action);
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        errorMessage: ''
      })
    case ActionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  links,
  isHeaderSearchFocused,
  auth
})
