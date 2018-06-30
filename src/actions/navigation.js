// Manipulate navigation flags for different user flows

const DISABLE_NAVIGATION_TO_CATEGORIES = 'DISABLE_NAVIGATION_TO_CATEGORIES'

export function disableNavigationToCategories() {
  return {
    type: DISABLE_NAVIGATION_TO_CATEGORIES,
  }
}