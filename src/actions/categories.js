import fetch from 'cross-fetch'
import { SERVER_URL } from 'src/app-constants'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
// Not used now
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RETRIEVE_CATEGORIES_FAILED = 'RETRIEVE_CATEGORIES_FAILED'

const BASE_CATEGORIES_URL = SERVER_URL + 'budgets/categories/'

function receiveCategories(json) {
  return {
    categories: json,
    type: RECEIVE_CATEGORIES 
  }
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

function retrieveCategoriesFailed() {
  return {
    type: RETRIEVE_CATEGORIES_FAILED
  }
}

export function getCategories() {
  // Retrieve information about possible categories
  return (dispatch) => {
    dispatch(requestCategories())
    return fetch(BASE_CATEGORIES_URL, {
        credentials: 'include',
        method: 'get',
      })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(response.data);
        }
        return response.json()
      })
      .then(json => dispatch(receiveCategories(json)))
      .catch(err => {
        dispatch(retrieveCategoriesFailed())
      })
  }
}
