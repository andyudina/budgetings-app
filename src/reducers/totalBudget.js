const defaultTotalBudget = {
  isUpdating: false,
  formErrors: {
    generalError: undefined
  },
  amount: 0
}

const totalBudget = (state = defaultTotalBudget, action) => {
  switch (action.type) {
    case 'RECEIVE_USER_INFO':
      return Object.assign(
        {},
        state,
        {
          amount: action.totalBudget,
        }
      )
    case 'TRY_UPDATE_TOTAL_BUDGET':
      return Object.assign(
        {},
        state,
        {
          isUpdating: true,
        })
    case 'TOTAL_BUDGET_UPDATED':
      return Object.assign(
        {},
        state,
        {
          isUpdating: false,
          formErrors: defaultTotalBudget.formErrors,
          amount: action.amount,
        })
    case 'TOTAL_BUDGET_UPDATE_FAILED':
      return Object.assign(
        {},
        state,
        {
          isUpdating: false,
          formErrors: Object.assign(
            {},
            state.formErrors,
            {
              generalError: action.error
            }
          )
        })
    default:
      return state
  }
}

export default totalBudget