import { connect } from 'react-redux';
import { tryCreateBudget } from 'src/actions/categorisedBudgets';
import AddBudget from 'src/components/existing-user/AddBudget';


const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.categorisedBudgets.newBudget.formErrors,
    isCreating: state.categorisedBudgets.newBudget.isCreating,
    categories: state.categories.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createBudget: (budget, category) =>
    dispatch(tryCreateBudget(budget, category)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddBudget);