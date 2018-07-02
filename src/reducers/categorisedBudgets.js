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
  ]
}

const categorisedBudgets = (state = defaultCategorisedBudgets, action) => {
  switch (action.type) {
    case 'RECEIVE_CATEGORIES':
      var budgets = []
      for (var index in action.budgets) {
        budgets.push({
          id: action.budgets[index].id,
          amount: action.budgets[index].amount,
          category: action.budgets[index].category,
          totalExpensesInCurrentMonth: 
            action.budgets[index].totalExpensesInCurrentMonth,
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

    case 'REQUEST_CATEGORIES':
      return Object.assign(
        {},
        state,
        {
          isFetching: true
        }
      )

    case 'RETRIEVE_CATEGORIES_FAILED':
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
        }
      )

    default:
      return state
  }
}

export default categorisedBudgets;