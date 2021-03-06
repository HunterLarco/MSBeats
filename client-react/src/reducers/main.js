import * as ActionTypes from '../actions'
// import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import reactCookie from 'react-cookie';

function currentRoute (state = {}, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_ROUTE:
      return action.nextState;
    default:
      return state;
  }
}

function isHeaderSearchFocused (state = false, action) {
  switch (action.type) {
    case ActionTypes.SET_HEADER_SEARCH_FOCUS:
      return action.isFocused
    default:
      return state
  }
}

function selectedLinksFilter (state = {
  name: 'top',
  page: 1
}, action) {
  switch (action.type) {
    case ActionTypes.SELECT_LINKS_FILTER:
      return {
        name: action.filter,
        page: action.page || 1
      }
    default:
      return state;
  }
}

function links (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  page: 1
}, action) {
  switch (action.type) {
    case ActionTypes.INVALIDATE_LINKS:
      return Object.assign({}, state, {
        didInvalidate: true,
        page: action.page
      })
    case ActionTypes.REQUEST_LINKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        page: action.page
      })
    case ActionTypes.RECEIVE_LINKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        page: action.page
      });
    default:
      return state
  }
}

function linksByFilter(state = {}, action) {
  switch (action.type) {
    case ActionTypes.INVALIDATE_LINKS:
    case ActionTypes.RECEIVE_LINKS:
    case ActionTypes.REQUEST_LINKS:
      return Object.assign({}, state, {
        [action.filter]: links(state[action.filter], action)
      });
    default:
      return state
  }
}

function getUserFromStorage() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null
}

function auth (state = {
  isFetching: false,
  isAuthenticated: !!reactCookie.load('loginid'),
  user: canUseDOM ? getUserFromStorage() : null
}, action) {
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
    case ActionTypes.LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null
      })
    default:
      return state
  }
}

function signup (state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case ActionTypes.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case ActionTypes.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        errorMessage: ''
      })
    case ActionTypes.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

function linkWithComments (state = {
  isFetching: false,
  data: {}
}, action) {
  switch (action.type) {
    case ActionTypes.COMMENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ActionTypes.COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.response
      });
    case ActionTypes.COMMENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      });
    case ActionTypes.COMMENTS_INVALIDATE:
      return Object.assign({}, state, {
        data: {}
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  currentRoute,
  selectedLinksFilter,
  linksByFilter,
  isHeaderSearchFocused,
  auth,
  linkWithComments,
  signup
})
