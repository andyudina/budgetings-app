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
    //   'totalExpensesInCurrentMonth'
    // }
  ],
  newBudget: {
    isCreating: false,
    formErrors: {
      amountError: null,
      categoryError: null,
      generalError: null,
    }
  }
}

const categorisedBudgets = (state = defaultCategorisedBudgets, action) => {
  switch (action.type) {
    // List categorised budjets
    case 'RECEIVE_CATEGORISED_BUDGETS':
      var budgets = []
      for (var index in action.budgets) {
        budgets.push({
          id: action.budgets[index].id,
          amount: action.budgets[index].amount,
          category: action.budgets[index].category,
          totalExpensesInCurrentMonth: 
            action.budgets[index].total_expenses_in_current_month,
        });
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
      return Object.assign(
        {},
        state,
        {
          budgets: [
            ...state.budgets,
            {
              id: action.id,
              amount: action.amount,
              category: action.category,
              totalExpensesInCurrentMonth: 0,
            }
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

    default:
      return state
  }
}

export default categorisedBudgets;