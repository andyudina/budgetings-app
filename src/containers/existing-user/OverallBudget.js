import { connect } from 'react-redux';
import OverallBudget from 'src/components/existing-user/OverallBudget';


const mapStateToProps = (state, ownProps) => {
  return {
    budgets: state.categorisedBudgets.budgets
  }
}



export default connect(
  mapStateToProps)(OverallBudget);