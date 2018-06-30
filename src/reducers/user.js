const defaultUser = {
  isFetching: true,
  user: {
    isNew: true
  }
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case 'RECEIVE_USER_INFO':
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          user: Object.assign(
            {},
            state.user,
            {
              isNew: action.totalBudget === 0,
            }
          )
        })
    case 'REQUEST_USER_INFO':
      return Object.assign(
        {},
        state,
        {
          isFetching: true,
        })
    case 'RETRIEVE_CURRENT_USER_FAILED':
      // TODO: what actually should happen here?
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
        })
    default:
      return state
  }
}

export default user