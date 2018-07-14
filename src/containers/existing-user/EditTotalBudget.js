import { connect } from 'react-redux';
import EditTotalBudget from 'src/components/existing-user/EditTotalBudget';


const mapStateToProps = (state, ownProps) => {
  return {
    modifyBudgetInEditTotalBudgetView: 
      state.navigation.modifyBudgetInEditTotalBudgetView,
    totalBudget: state.totalBudget.amount,
  }
}

export default connect(
  mapStateToProps)(EditTotalBudget);