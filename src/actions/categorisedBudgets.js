import fetch from 'cross-fetch'
import { _processServerError } from 'src/actions/_utils'
import { SERVER_URL } from 'src/app-constants'

export const TRY_CREATE_BUDGET = 'TRY_CREATE_BUDGET'
export const BUDGET_CREATED = 'BUDGET_CREATED'
export const BUDGET_CREATE_FAILED = 'BUDGET_CREATE_FAILED'
export const RECEIVE_CATEGORISED_BUDGETS = 'RECEIVE_CATEGORISED_BUDGETS'
// Not used now
export const REQUEST_CATEGORISED_BUDGETS= 'REQUEST_CATEGORISED_BUDGETS'
export const RETRIEVE_CATEGORISED_BUDGETS_FAILED =
  'RETRIEVE_CATEGORISED_BUDGETS_FAILED'

const BASE_CATEGORIESED_BUDGETS_URL = SERVER_URL + 'budgets/'

function receiveBudgets(json) {
  return {
    budgets: json,
    type: RECEIVE_CATEGORISED_BUDGETS
  }
}

function requestBudgets() {
  return {
    type: REQUEST_CATEGORISED_BUDGETS
  }
}

function retrieveBudgetsFailed() {
  return {
    type: RETRIEVE_CATEGORISED_BUDGETS_FAILED
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

function startCreatingBudget() {
  return {
    type: TRY_CREATE_BUDGET
  }
}

function budgetCreated(budgetAmount, budgetCategory) {
  return {
    type: BUDGET_CREATED,
    amount: budgetAmount,
    category: budgetCategory,
  }
}

function createBudgetFailed(errors) {
  return {
    type: BUDGET_CREATE_FAILED,
    errors: errors,
  }
}

function _handleCreationError(dispatch, errors) {
  if (!errors || 0 === errors.length) {
    errors = {
      generalError: 'Unknown error occured'
    }
   } else {
    if (errors === Object(errors)) {
      // errors are object
      errors = _processServerError(errors);
    } else {
      errors = {
        generalError: errors
      }
    }
  } 
  dispatch(createBudgetFailed(errors))
}

function createBudget(budgetAmount, budgetCategory) {
  // Update total budget amount
  return (dispatch) => {
    dispatch(startCreatingBudget())
    return fetch(BASE_CATEGORIESED_BUDGETS_URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: budgetAmount,
        category: budgetCategory
      })
    })
    .then(response => {
      if (response.status >= 400) {
        console.log('respons-', response)
        //return 
          response
            .json()
            .then(json => {
              _handleCreationError(dispatch, json);
            })
            .catch(err => {
              _handleCreationError(dispatch, err.message);
            })
      } else {
        //return 
          response
            .json()
            .then(json => {
               dispatch(budgetCreated(json.amount, json.category));
            })
            .catch(err => {
              _handleCreationError(dispatch, err.message);
            })
      }
    })
  }
}

function _canCreateBudget(
    budgetAmount, budgetCategory) {
  var errors = {};
  if (budgetAmount === 0 || budgetAmount == null) {
    errors.amountError = 'Budget amount can not be empty'
  }
  if (budgetCategory == null) {
    errors.categoryError = 'Please select budgeting category'
  }
  if (Object.keys(errors).length === 0) {
    return [true, null]
  } else {
    return [false, errors]
  }
}

export function tryCreateBudget(budgetAmount, budgetCategory) {
  // Try create budget for category
  return (dispatch) => {
    var [canCreateBudget, errors] = _canCreateBudget(
      budgetAmount, budgetCategory)
    if (canCreateBudget) {
      dispatch(createBudget(budgetAmount, budgetCategory))
    } else {
      dispatch(
        createBudgetFailed(errors))
    }
  }
}
