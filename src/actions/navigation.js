// Manipulate navigation flags for different user flows

const DISABLE_NAVIGATION_TO_CATEGORIES = 'DISABLE_NAVIGATION_TO_CATEGORIES'
const ENABLE_BUDGET_UPDATE = 'ENABLE_BUDGET_UPDATE'

export function disableNavigationToCategories() {
  return {
    type: DISABLE_NAVIGATION_TO_CATEGORIES,
  }
}

export function enableBudgetUpdate(id) {
  return {
    type: ENABLE_BUDGET_UPDATE,
    id: id
  }
}
