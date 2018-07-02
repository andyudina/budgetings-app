import fetch from 'cross-fetch'
import { SERVER_URL } from 'src/app-constants'

export const TRY_UPDATE_TOTAL_BUDGET = 'TRY_UPDATE_TOTAL_BUDGET'
export const TOTAL_BUDGET_UPDATED = 'TOTAL_BUDGET_UPDATED'
export const TOTAL_BUDGET_UPDATE_FAILED = 'TOTAL_BUDGET_UPDATE_FAILED'

const BASE_TOTAL_BUDGET_API_URL = SERVER_URL + 'budgets/total/'

function tryUpdateTotalBudget() {
  return {
    type: TRY_UPDATE_TOTAL_BUDGET
  }
}

function totalBudgetUpdated(totalBudgetAmount) {
  return {
    type: TOTAL_BUDGET_UPDATED,
    amount: totalBudgetAmount
  }
}

function updateTotalBudgetFailed(error) {
  return {
    type: TOTAL_BUDGET_UPDATE_FAILED,
    error: error,
  }
}

function updateTotalBudget(totalBudgetAmount) {
  // Update total budget amount
  return (dispatch) => {
    dispatch(tryUpdateTotalBudget())
    return fetch(BASE_TOTAL_BUDGET_API_URL, {
      method: 'patch',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: totalBudgetAmount
      })
    })
    .then(response => {
      if (response.status >= 400) {
        throw new Error(response.data);
      }
      return response.json()
    })
    .then(json => {
      dispatch(totalBudgetUpdated(json.amount));
    })
    .catch(err => {
      let error = err.message
      if (!error || 0 === error.length) {
        error = 'Unknown error occured'
      }
      dispatch(updateTotalBudgetFailed(error))
    })
  }
}

function _canUpdateTotalBudget(totalBudgetAmount) {
  return (totalBudgetAmount != 0 && totalBudgetAmount != null);
}

export function setTotalBudget(totalBudgetAmount) {
  // Try updatetotal budget amount
  // if passed value is correct
  return (dispatch) => {
    if (_canUpdateTotalBudget(totalBudgetAmount)) {
      dispatch(updateTotalBudget(totalBudgetAmount))
    } else {
      dispatch(
        updateTotalBudgetFailed('Total budget can not be empty'))
    }
  }
}
