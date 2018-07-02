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