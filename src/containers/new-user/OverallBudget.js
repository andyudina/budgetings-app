import { connect } from 'react-redux';
import { setTotalBudget } from 'src/actions/totalBudget';
import { disableNavigationToCategories } from 'src/actions/navigation';
import OverallBudget from 'src/components/new-user/OverallBudget';


const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.totalBudget.formErrors,
    isUpdating: state.totalBudget.isUpdating,
    navigateToCategories: state.navigation.navigateToCategories,
    totalBudget: state.totalBudget.amount,
    // we don't need to use total budget, received from server here
    // if we are on this view, total budget is 0 (user just created)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTotalBudget: (totalBudget) => dispatch(setTotalBudget(totalBudget)),
  disableNavigationToCategories:
    () => dispatch(disableNavigationToCategories())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(OverallBudget);