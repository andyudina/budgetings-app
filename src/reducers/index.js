import { combineReducers } from 'redux';
import user from 'src/reducers/user';
import totalBudget from 'src/reducers/totalBudget';
import navigation from 'src/reducers/navigation';

export default combineReducers({
  user,
  totalBudget,
  navigation
})
