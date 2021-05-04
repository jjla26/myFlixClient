export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_ERROR = 'SET_ERROR'

export function setUser(payload){
  return { type: SET_USER, payload }
}

export function setUserDetails(payload){
  return { type: SET_USER_DETAILS, payload }
}

export function setMessage(payload){
  return { type: SET_MESSAGE, payload }
}

export function setError(payload){
  return { type: SET_ERROR, payload }
}

export function setMovies(payload) {
  return { type: SET_MOVIES, payload };
}

export function setFilter(payload) {
  return { type: SET_FILTER, payload };
}