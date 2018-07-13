import fetch from 'cross-fetch'
import { _handleErrors } from 'src/actions/_utils'
import { SERVER_URL } from 'src/app-constants'

export const TRY_CREATE_BUDGET = 'TRY_CREATE_BUDGET'
export const BUDGET_CREATED = 'BUDGET_CREATED'
export const BUDGET_CREATE_FAILED = 'BUDGET_CREATE_FAILED'

export const TRY_UPDATE_BUDGET = 'TRY_UPDATE_BUDGET'
export const BUDGET_UPDATED = 'BUDGET_UPDATED'
export const BUDGET_UPDATE_FAILED = 'BUDGET_UPDATE_FAILED'

export const TRY_DELETE_BUDGET = 'TRY_DELETE_BUDGET'
export const BUDGET_DELETED = 'BUDGET_DELETED'
export const BUDGET_DELETE_FAILED = 'BUDGET_DELETE_FAILED'

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

// Create budget

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

function createBudget(budgetAmount, budgetCategory) {
  // Create budget using amount and category
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
        response
            .json()
            .then(json => {
              _handleErrors(
                (errors) => dispatch(createBudgetFailed(errors)),
                json);
            })
            .catch(err => {
              _handleErrors(
                (errors) => dispatch(createBudgetFailed(errors)),
                err.message);
            })
      } else {
        response
            .json()
            .then(json => {
               dispatch(budgetCreated(json.amount, json.category));
            })
            .catch(err => {
              _handleErrors(
                (errors) => dispatch(createBudgetFailed(errors)),
                err.message);
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

// Update budget
function startUpdateBudget(budgetId) {
  return {
    type: TRY_UPDATE_BUDGET,
    id: budgetId
  }
}

function budgetUpdated(budgetAmount, budgetId) {
  return {
    type: BUDGET_UPDATED,
    amount: budgetAmount,
    id: budgetId
  }
}

function updateBudgetFailed(id, errors) {
  return {
    type: BUDGET_UPDATE_FAILED,
    errors: errors,
    id: id,
  }
}

function updateBudget(budgetAmount, budgetId) {
  // Update budget by id
  return (dispatch) => {
    dispatch(startUpdateBudget(budgetId))
    var url = BASE_CATEGORIESED_BUDGETS_URL + budgetId + '/'
    return fetch(url, {
      method: 'patch',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: budgetAmount,
      })
    })
    .then(response => {
      if (response.status >= 400) {
        response
            .json()
            .then(json => {
              _handleErrors(
                (errors) => dispatch(
                  updateBudgetFailed(budgetId, errors)),
                json);
            })
            .catch(err => {
              _handleErrors(
                (errors) => dispatch(
                  updateBudgetFailed(budgetId, errors)),
                err.message);
            })
      } else {
        response
            .json()
            .then(json => {
               dispatch(budgetUpdated(json.amount, budgetId));
            })
            .catch(err => {
              _handleErrors(
                (errors) => dispatch(
                  updateBudgetFailed(budgetId, errors)),
                err.message);
            })
      }
    })
  }
}

export function tryUpdateBudget(budgetAmount, budgetId) {
  // Try update budget by id
  return (dispatch) => {
    if (budgetAmount && budgetAmount >= 0) {
       dispatch(updateBudget(budgetAmount, budgetId))
    } else {
      dispatch(
        updateBudgetFailed(
          budgetId,
          {
            'generalError': 'Amount should not be empty'
          }
        )
      )
    }
  }
}

// Update budget
function startDeleteBudget(budgetId) {
  return {
    type: TRY_DELETE_BUDGET,
    id: budgetId
  }
}

function budgetDeleted(budgetId) {
  return {
    type: BUDGET_DELETED,
    id: budgetId
  }
}

function deleteBudgetFailed(id, errors) {
  return {
    type: BUDGET_DELETE_FAILED,
    id: budgetId,
  }
}

export function deleteBudget(budgetId) {
  // Delete budget by id
  return (dispatch) => {
    dispatch(startDeleteBudget(budgetId))
    var url = BASE_CATEGORIESED_BUDGETS_URL + budgetId + '/'
    return fetch(url, {
      method: 'delete',
      credentials: 'include',
    })
    .then(response => {
      if (response.status >= 400) {
        response
            .json()
            .then(json => {
              _handleErrors(
                (errors) => dispatch(
                  deleteBudgetFailed(budgetId, errors)),
                json);
            })
            .catch(err => {
              _handleErrors(
                (errors) => dispatch(
                  deleteBudgetFailed(budgetId, errors)),
                err.message);
            })
      } else {
        dispatch(budgetDeleted(budgetId));
      }
    })
  }
}
