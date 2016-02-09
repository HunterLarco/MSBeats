import LinksApiEndpoint from '../api-endpoints/LinksApiEndpoint';
import UserApiEndpoint from '../api-endpoints/UserApiEndpoint';
import reactCookie from 'react-cookie';
import { browserHistory } from 'react-router';
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
export const SELECT_LINKS_FILTER = 'SELECT_LINKS_FILTER'

export function selectLinksFilter(filter, page) {
  return {
    type: SELECT_LINKS_FILTER,
    filter,
    page
  }
}

export function invalidateLinks() {
  return {
    type: INVALIDATE_LINKS
  }
}

function requestLinks(filter) {
  return {
    type: REQUEST_LINKS,
    filter
  }
}

function receiveLinks(filter, response) {
  return {
    type: RECEIVE_LINKS,
    items: response.links,
    receivedAt: Date.now(),
    filter
  }
}

function fetchLinks(filter, page) {
  return dispatch => {
    dispatch(requestLinks(filter))
    return LinksApiEndpoint.get(filter, page)
      .then(response => dispatch(receiveLinks(filter, response)))
  }
}

function shouldFetchLinks(links, page) {
  if (!links || links.page !== page) {
    return true
  }
  if (links.isFetching) {
    return false
  }
  return links.didInvalidate
}

export function fetchLinksIfNeeded({ name, page }) {
  return (dispatch, getState) => {
    const links = getState().linksByFilter[name];
    console.log(links);
    if (shouldFetchLinks(links, page)) {
      return dispatch(fetchLinks(name, page));
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
  console.log('receiveUpvoteLink', success);
  return dispatch => {
    dispatch(invalidateLinks());
    return {
      type: RECEIVE_UPVOTE_LINK,
      success
    };
  }
}

export function upvoteLink(linkid) {
  return dispatch => {
    dispatch(requestUpvoteLink())
    return LinksApiEndpoint.upvote(linkid)
      .then(response => dispatch(receiveUpvoteLink(response.success)))
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

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true
  }
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    user
  }
}

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    message
  }
}

export function signupUser(email, username, password) {
  return dispatch => {
    dispatch(requestSignup())
    return UserApiEndpoint.signup(email, username, password)
      .then(response => {
        if (response.success) {
          dispatch(receiveSignup(response))
        } else {
          dispatch(signupError(response.message))
        }
      })
  }
}

export const SUBMIT_LINK_REQUEST = 'SUBMIT_LINK_REQUEST'
export const SUBMIT_LINK_SUCCESS = 'SUBMIT_LINK_SUCCESS'
export const SUBMIT_LINK_FAILURE = 'SUBMIT_LINK_FAILURE'

function requestSubmitLink() {
  return {
    type: SUBMIT_LINK_REQUEST,
    isFetching: true
  }
}

function receiveSubmitLink() {
  return {
    type: SUBMIT_LINK_SUCCESS,
    isFetching: false
  }
}

function submitLinkError(message) {
  return {
    type: SUBMIT_LINK_FAILURE,
    message
  }
}

export function submitLink(title, url) {
  return dispatch => {
    dispatch(requestSubmitLink());
    return LinksApiEndpoint.post({ title, url })
      .then(response => {
        if (response.success) {
          dispatch(receiveSubmitLink());
          dispatch(invalidateLinks());
          dispatch(fetchLinks('new'));
          browserHistory.push('/new');
        } else {
          dispatch(submitLinkError(response.message));
        }
      });
  }
}

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

function requestComments(linkid) {
  return {
    type: COMMENTS_REQUEST,
    linkid
  };
}

function receiveComments(response) {
  return {
    type: COMMENTS_SUCCESS,
    response
  };
}

function commentsError(message) {
  return {
    type: COMMENTS_FAILURE,
    message
  };
}

export function fetchComments(linkid) {
  return dispatch => {
    dispatch(requestComments(linkid));
    return LinksApiEndpoint.comments(linkid)
      .then(response => {
        if (response.success) {
          dispatch(receiveComments(response));
        } else {
          dispatch(commentsError(response.message));
        }
      });
  };
}


export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

function requestCreateComment(commentid, text) {
  return {
    type: CREATE_COMMENT_REQUEST,
    commentid,
    text
  };
}

function receiveCreateComment(response) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    response
  };
}

function createCommentError(message) {
  return {
    type: CREATE_COMMENT_FAILURE,
    message
  };
}

function dispatchTimeout(fct) {
  window.setTimeout(fct.bind, 250);
}

export function createComment(commentid, text) {
  debugger;
  return (dispatch, getState) => {
    dispatch(requestCreateComment(commentid, text));
    return LinksApiEndpoint.createComment(commentid, text)
      .then(response => {
        if (response.success) {
          dispatch(receiveCreateComment(response));
          dispatchTimeout(dispatch(fetchComments(getState().linkWithComments.data.linkid)));
        } else {
          dispatch(createCommentError(response.message));
        }
      });
  };
}
