import LinksApiEndpoint from '../api-endpoints/LinksApiEndpoint';
import UserApiEndpoint from '../api-endpoints/UserApiEndpoint';
import reactCookie from 'react-cookie';
// Make sure to export everything in this file that needs exporting

export const SET_HEADER_SEARCH_FOCUS = 'SET_HEADER_SEARCH_FOCUS'

export function setHeaderSearchFocus(isFocused) {
  return {
    type: SET_HEADER_SEARCH_FOCUS,
    isFocused
  }
}

export const INVALIDATE_LINKS = 'INVALIDATE_LINKS'
export const REQUEST_LINKS = 'REQUEST_LINKS'
export const RECEIVE_LINKS = 'RECEIVE_LINKS'

export function invalidateLinks() {
  return {
    type: INVALIDATE_LINKS
  }
}

function requestLinks() {
  return {
    type: REQUEST_LINKS
  }
}

function receiveLinks(response) {
  return {
    type: RECEIVE_LINKS,
    items: response.links,
    receivedAt: Date.now()
  }
}

function fetchLinks() {
  return dispatch => {
    dispatch(requestLinks())
    return LinksApiEndpoint.get().then(response => dispatch(receiveLinks(response)))
  }
}

function shouldFetchLinks(state) {
  const links = state.links.items
  if (!links.length) {
    return true
  }
  if (links.isFetching) {
    return false
  }
  return links.didInvalidate
}

export function fetchLinksIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchLinks(getState())) {
      return dispatch(fetchLinks())
    }
  }
}

export const REQUEST_UPVOTE_LINK = 'REQUEST_UPVOTE_LINK'
export const RECEIVE_UPVOTE_LINK = 'RECEIVE_UPVOTE_LINK'

function requestUpvoteLink() {
  return {
    type: REQUEST_UPVOTE_LINK
  }
}

function receiveUpvoteLink(success) {
  return {
    type: RECEIVE_UPVOTE_LINK,
    success
  }
}

export function upvoteLink(linkid, loginid) {
  return dispatch => {
    dispatch(requestUpvoteLink())
    return LinksApiEndpoint.upvote(linkid, loginid)
      .then(json => dispatch(receiveUpvoteLink(json.success)))
  }
}

// export const REQUEST_USER = 'REQUEST_LOGIN'
// export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS'
// export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE'
//
// function requestLogin() {
//   return {
//     type: REQUEST_LOGIN
//   }
// }
//
// function receiveUserSucces() {
//   reutrn
// }
//
// function receiveLogin(response) {
//   return dispatch => {
//     if (response.succes) {
//       dispatch(receiveUserSucces(response))
//     } else {
//       dispatch(receiveUserSucces(response))
//     }
//   }
//   return Object.assign({
//     type: RECEIVE_LOGIN,
//   }, response)
// }

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin(user) {
  reactCookie.save('loginid', user.loginid);
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(emailusername, password) {
  return dispatch => {
    dispatch(requestLogin())
    return UserApiEndpoint.login(emailusername, password)
      .then(response => {
        if (response.success) {
          dispatch(receiveLogin(response))
        } else {
          dispatch(loginError(response.message))
        }
      })
  }
}

export function logoutUser() {
  reactCookie.remove('loginid');
  return {
    type: LOGOUT
  };
}
