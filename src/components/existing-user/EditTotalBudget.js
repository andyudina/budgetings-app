import React, { Component } from 'react';
import TotalBudget from 'src/containers/common/TotalBudget';
import { Button, Text, TextInput, View } from 'react-native';

export default class EditTotalBudget extends Component {
  // we fetch all information in first app load
  // so no extra fetches here
  render() {
    return (
      <View>
        <TotalBudget/>
        <Button
          onPress={() => {
            this.props.navigation.navigate('AddBudget');
          }}
          title='+ CATEGORY'/>
        <Button
          onPress={
            () => {
              this.props.navigation.navigate('UploadRecipt');
            }
          }
          title='DONE'/>
      </View>
    );
  }
}