import React from 'react';
import { Text } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import OverallBudgetNewUser from 'src/containers/new-user/OverallBudget';
import OverallBudgetExistingUser from 'src/containers/existing-user/OverallBudget';
import EditTotalBudget from 'src/containers/existing-user/EditTotalBudget';
import AddBudget from 'src/containers/existing-user/AddBudget';
import UploadReceipt from 'src/containers/existing-user/UploadReceipt';
import CategoriseReceipt from 'src/components/existing-user/CategoriseReceipt';
import UncategorisedReceipts from 'src/components/existing-user/UncategorisedReceipts';


const NewUserNavigation = createStackNavigator(
  {
    'OverallBudget': OverallBudgetNewUser,
    'EditTotalBudget': EditTotalBudget,
    'AddBudget': AddBudget,
    'UploadReceipt': UploadReceipt,
  },
  {
    initialRouteName: 'OverallBudget'
  }
);

const ExistingUserNavigation = createStackNavigator(
  {
    'OverallBudget': OverallBudgetExistingUser,
    'EditTotalBudget': EditTotalBudget,
    'AddBudget': AddBudget,
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