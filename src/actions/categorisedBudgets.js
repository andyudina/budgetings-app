import fetch from 'cross-fetch'
import { SERVER_URL } from 'src/app-constants'

export const RECEIVE_CATEGORIESED_BUDGETS = 'RECEIVE_CATEGORIESED_BUDGETS'
// Not used now
export const REQUEST_CATEGORIESED_BUDGETS= 'REQUEST_CATEGORIES'
export const RETRIEVE_CATEGORIESED_BUDGETS_FAILED =
  'RETRIEVE_CATEGORIESED_BUDGETS_FAILED'

const BASE_CATEGORIESED_BUDGETS_URL = SERVER_URL + 'budgets/'

function receiveBudgets(json) {
  return {
    budgets: json,
    type: RECEIVE_CATEGORIESED_BUDGETS
  }
}

function requestBudgets() {
  return {
    type: REQUEST_CATEGORIESED_BUDGETS
  }
}

function retrieveBudgetsFailed() {
  return {
    type: RETRIEVE_CATEGORIESED_BUDGETS_FAILED
  }
}

export function getCategorisedBudgets() {
  // Retrieve information about possible categories
  return (dispatch) => {
    dispatch(requestBudgets())
    return fetch(BASE_CATEGORIESED_BUDGETS_URL, {
        credentials: 'include',
        method: 'get',
      })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(response.data);
        }
        return response.json()
      })
      .then(json => dispatch(receiveBudgets(json)))
      .catch(err => {
        dispatch(retrieveBudgetsFailed())
      })
  }
}