import { connect } from 'react-redux';
import { setTotalBudget } from 'src/actions/totalBudget';
import AddCategory from 'src/components/existing-user/AddCategory';


const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.totalBudget.formErrors,
    modifyBudgetInAddCategoryView: 
      state.navigation.modifyBudgetInAddCategoryView,
    totalBudget: state.totalBudget.amount,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTotalBudget: (totalBudget) => dispatch(setTotalBudget(totalBudget)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddCategory);