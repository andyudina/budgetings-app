import { createStackNavigator } from 'react-navigation';
import OverallBudgetNewUser from 'src/new-user/OverallBudget';
import UploadFirstReceipt from 'src/new-user/UploadFirstReceipt';
import OverallBudgetExistingUser from 'src/existing-user/OverallBudget';
import AddCategory from 'src/existing-user/AddCategory';
import EditCategory from 'src/existing-user/EditCategory';
import UploadReceipt from 'src/existing-user/UploadReceipt';
import CategoriseReceipt from 'src/existing-user/CategoriseReceipt';
import UncategorisedReceipts from 'src/existing-user/UncategorisedReceipts';


export default Navigation = createStackNavigator(
  {
    // New user
    'OverallBudgetNewUser': OverallBudgetNewUser,
    'UploadFirstReceipt': UploadFirstReceipt,

    // Existing user
    'OverallBudgetExistingUser': OverallBudgetExistingUser,
    'AddCategory': AddCategory,
    'EditCategory': EditCategory,
    'UploadReceipt': UploadReceipt,
    'CategoriseReceipt': CategoriseReceipt,
    'UncategorisedReceipts': UncategorisedReceipts,
  },
  {
    initialRouteName: 'OverallBudgetNewUser',
  }
);
