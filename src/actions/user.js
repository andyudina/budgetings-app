import fetch from 'cross-fetch'
import { SERVER_URL } from 'src/app-constants'

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
// Not used now
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RETRIEVE_CURRENT_USER_FAILED = 'RETRIEVE_CURRENT_USER_FAILED'

const BASE_USER_API_URL = SERVER_URL + 'users/'

function receiveUserInfo(json) {
  return {
    totalBudget: json.total_budget,
    type: RECEIVE_USER_INFO
  }
}

function requestUserInfo() {
  // action to dispatch
  // when we just requested user info
  return {
    type: REQUEST_USER_INFO
  }
}

function retrieveUserInfoFailed() {
  // action to dispathc
  // when we failed to get current user
  return {
    type: RETRIEVE_CURRENT_USER_FAILED
  }
}
export function getCurrentUser() {
  // Retrieve information about current user from server
  return (dispatch) => {
    dispatch(requestUserInfo())
    return fetch(BASE_USER_API_URL + 'anonymous/', {
        credentials: 'include',
        method: 'post',
      })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(response.data);
        }
        return response.json()
      })
      .then(json => dispatch(receiveUserInfo(json)))
      .catch(err => {
        dispatch(retrieveUserInfoFailed())
      })
  }
}
