import { connect } from 'react-redux';
import { setTotalBudget } from 'src/actions/totalBudget';
import EditTotalBudget from 'src/components/existing-user/EditTotalBudget';


const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.totalBudget.formErrors,
    modifyBudgetInEditTotalBudgetView: 
      state.navigation.modifyBudgetInEditTotalBudgetView,
    totalBudget: state.totalBudget.amount,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTotalBudget: (totalBudget) => dispatch(setTotalBudget(totalBudget)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(EditTotalBudget);