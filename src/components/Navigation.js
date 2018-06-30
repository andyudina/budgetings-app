import React from 'react';
import { Text } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import OverallBudgetNewUser from 'src/containers/new-user/OverallBudget';
import UploadFirstReceipt from 'src/components/new-user/UploadFirstReceipt';
import OverallBudgetExistingUser from 'src/components/existing-user/OverallBudget';
import AddCategory from 'src/components/existing-user/AddCategory';
import EditCategory from 'src/components/existing-user/EditCategory';
import UploadReceipt from 'src/components/existing-user/UploadReceipt';
import CategoriseReceipt from 'src/components/existing-user/CategoriseReceipt';
import UncategorisedReceipts from 'src/components/existing-user/UncategorisedReceipts';


const NewUserNavigation = createStackNavigator(
  {
    'OverallBudget': OverallBudgetNewUser,
    'UploadFirstReceipt': UploadFirstReceipt,
    'AddCategory': AddCategory,
    'EditCategory': EditCategory,
  },
  {
    initialRouteName: 'OverallBudget'
  }
);

const ExistingUserNavigation = createStackNavigator(
  {
    'OverallBudget': OverallBudgetExistingUser,
    'AddCategory': AddCategory,
    'EditCategory': EditCategory,
    'UploadReceipt': UploadReceipt,
    'CategoriseReceipt': CategoriseReceipt,
    'UncategorisedReceipts': UncategorisedReceipts,
  },
  {
    initialRouteName: 'OverallBudget'
  }
);

const Navigation = ({isNewUser}) => {
  const SwitchNavigation = createSwitchNavigator(
    {
      ExistingUser: {
        screen: ExistingUserNavigation
      },
      NewUser: {
        screen: NewUserNavigation
      }
    },
    {
      initialRouteName: isNewUser ? 'NewUser' : 'ExistingUser'
    }
  );
  return <SwitchNavigation/>;
};

export default Navigation;