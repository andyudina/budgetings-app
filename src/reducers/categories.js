const defaultCategories = {
  isFetching: false,
  categories: [
    // format:
    // {id, name}
  ]
}

const categories = (state = defaultCategories, action) => {
  switch (action.type) {
    case 'RECEIVE_CATEGORIES':
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          categories: action.categories
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

export default categories