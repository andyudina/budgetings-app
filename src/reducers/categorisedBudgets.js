const generalFormErrors = {
  amountError: null,
  categoryError: null,
  generalError: null,
};

const defaultBudgetParams = {
  formErrors: generalFormErrors,
  isUpdating: false,
  modify: false
};

const defaultCategorisedBudgets = {
  isFetching: false,
  budgets: [
    // format:
    // {
    //   'amount',
    //   'id',
    //   'category': {
    //     'id',
    //     'name',
    //   },
    //   'totalExpensesInCurrentMonth',
    //   'formErrors',
    //   'isUpdating',
    //   'modify',
    // }
  ],
  newBudget: {
    isCreating: false,
    formErrors: Object.assign({}, generalFormErrors)
  }
}

const _updateBudgetInArray = (budgets, budgetId, changes) => {
  var newBudgets = [];
  for (var budgetIndex in budgets) {
    var budget = budgets[budgetIndex];
    if (budget.id === budgetId) {
      budget = Object.assign(
        {},
        budget,
        changes);
    }
    newBudgets.push(budget);
  }
  return newBudgets;
}

const _deleteBudgetInArray = (budgets, budgetId) => {
  var newBudgets = [];
  for (var budgetIndex in budgets) {
    var budget = budgets[budgetIndex];
    if (budget.id !== budgetId) {
      newBudgets.push(budget);
    }
  }
  return newBudgets;
}

const categorisedBudgets = (state = defaultCategorisedBudgets, action) => {
  switch (action.type) {
    // List categorised budjets
    case 'RECEIVE_CATEGORISED_BUDGETS':
      var budgets = []
      for (var index in action.budgets) {
        var budget = {
          id: action.budgets[index].id,
          amount: action.budgets[index].amount,
          category: action.budgets[index].category,
          totalExpensesInCurrentMonth: 
            action.budgets[index].total_expenses_in_current_month,
        };
        budget = Object.assign({}, budget, defaultBudgetParams);
        budgets.push(budget);
      }

      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          budgets: budgets
        }
      )

    case 'REQUEST_CATEGORISED_BUDGETS':
      return Object.assign(
        {},
        state,
        {
          isFetching: true
        }
      )

    case 'RETRIEVE_CATEGORISED_BUDGETS_FAILED':
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
        }
      )

    // Create categorised budget
    case 'TRY_CREATE_BUDGET':
      return Object.assign(
        {},
        state,
        {
          newBudget: Object.assign(
            {},
            state.newBudget,
            {
              isCreating: true,
              formErrors: defaultCategorisedBudgets.newBudget.formErrors,
            }
          )
        }
      )

    case 'BUDGET_CREATE_FAILED':
      return Object.assign(
        {},
        state,
        {
          newBudget: Object.assign(
            {},
            state.newBudget,
            {
              isCreating: false,
              formErrors: Object.assign(
                {},
                defaultCategorisedBudgets.newBudget.formErrors,
                action.errors
              )
            }
          )
        }
      )

    case 'BUDGET_CREATED':
      var newBudget =  {
        id: action.id,
        amount: action.amount,
        category: action.category,
        totalExpensesInCurrentMonth: 0,
      };
      newBudget = Object.assign({}, newBudget, defaultBudgetParams);
      return Object.assign(
        {},
        state,
        {
          budgets: [
            ...state.budgets,
            newBudget,
          ],
          newBudget: Object.assign(
            {},
            state.newBudget,
            {
              isCreating: false,
              formErrors: defaultCategorisedBudgets.newBudget.formErrors,
            }
          )
        }
      )

      // Update categorised budget
    case 'TRY_UPDATE_BUDGET':
      return Object.assign(
        {},
        state,
        {
          budgets: _updateBudgetInArray(
            state.budgets,
            action.id,
            {
              isUpdating: true,
            })
        }
      )

    case 'BUDGET_UPDATE_FAILED':
      return Object.assign(
        {},
        state,
        {
          budgets: _updateBudgetInArray(
            state.budgets,
            action.id,
            {
              isUpdating: false,
              formErrors: Object.assign(
                {},
                generalFormErrors,
                action.errors)
            })
        }
      )

    case 'BUDGET_UPDATED':
      return Object.assign(
        {},
        state,
        {
          budgets: _updateBudgetInArray(
            state.budgets,
            action.id,
            {
              amount: action.amount,
              isUpdating: false,
              formErrors: generalFormErrors,
              modify: false,
            })
        }
      )

    // Delete budget
      // Update categorised budget
    case 'TRY_DELETE_BUDGET':
      return Object.assign(
        {},
        state,
        {
          budgets: _updateBudgetInArray(
            state.budgets,
            action.id,
            {
              isUpdating: true,
            })
        }
      )

    case 'BUDGET_DELETE_FAILED':
      return Object.assign(
        {},
        state,
        {
          budgets: _updateBudgetInArray(
            state.budgets,
            action.id,
            {
              isUpdating: false,
              formErrors: Object.assign(
                {},
                generalFormErrors,
                action.errors)
            })
        }
      )

    case 'BUDGET_DELETED':
      return Object.assign(
        {},
        state,
        {
          budgets: _deleteBudgetInArray(
            state.budgets,
            action.id)
        }
      )

    // change layout
    case 'ENABLE_BUDGET_UPDATE':
      return Object.assign(
        {},
        state,
        {
          budgets: _updateBudgetInArray(
            state.budgets,
            action.id,
            {
              modify: true
            })
        }
      )

    default:
      return state
  }
}

export default categorisedBudgets;