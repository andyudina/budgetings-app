import { connect } from 'react-redux';
import { setTotalBudget } from 'src/actions/totalBudget';
import { modifyTotalBudget } from 'src/actions/navigation';
import TotalBudget from 'src/components/common/TotalBudget';


const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.totalBudget.formErrors,
    totalBudget: state.totalBudget.amount,
    modifyBudget: state.totalBudget.modifyBudget,
    spentBudget: state.totalBudget.spent,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTotalBudget: (totalBudget) => dispatch(setTotalBudget(totalBudget)),
  modifyTotalBudget: () => dispatch(modifyTotalBudget()),
})



export default connect(
  mapStateToProps,
  mapDispatchToProps)(TotalBudget);