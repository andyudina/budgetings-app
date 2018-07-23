import { combineReducers } from 'redux';
import user from 'src/reducers/user';
import totalBudget from 'src/reducers/totalBudget';
import navigation from 'src/reducers/navigation';
import categories from 'src/reducers/categories';
import categorisedBudgets from 'src/reducers/categorisedBudgets';
import receipts from 'src/reducers/receipts';

export default combineReducers({
  user,
  totalBudget,
  navigation,
  categories,
  categorisedBudgets,
  receipts,
})
