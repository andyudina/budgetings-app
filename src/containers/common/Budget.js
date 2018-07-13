import { connect } from 'react-redux';
import { 
    tryUpdateBudget,
    deleteBudget,
} from 'src/actions/categorisedBudgets';
import { enableBudgetUpdate } from 'src/actions/navigation';
import Budget from 'src/components/common/Budget';


const mapDispatchToProps = (dispatch, ownProps) => ({
  updateBudget: (amount, id) =>
    dispatch(tryUpdateBudget(amount, id)),
  deleteBudget: (id) =>
    dispatch(deleteBudget(id)),
  tryUpdateBudget: (id) =>
    dispatch(enableBudgetUpdate(id)),

})


export default connect(
  null,
  mapDispatchToProps)(Budget);