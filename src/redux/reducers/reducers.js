import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_MESSAGE, SET_ERROR, SET_USER_DETAILS } from '../actions/actions';

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state;
  }
}

function message(state = '', action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload
    default:
      return state;
  }
}

function error(state = '', action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    default:
      return state;
  }
}

function userDetails(state = {}, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return action.payload
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.payload;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  userDetails,
  message,
  error
});

export default moviesApp;