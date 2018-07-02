import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default class AddCategory extends Component {
  // we fetch all information in first app load
  // so no extra fetches here
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: this.props.totalBudget,
      modifyBudget: this.props.modifyBudgetInAddCateoryView,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        modifyBudget: nextProps.modifyBudgetInAddCateoryView
    });
  }

  render() {
    return (
      <View>
       {!this.state.modifyBudget && <View>
          <Text>
          { this.state.totalBudget } €
          </Text>
          <Button
            onPress={() => this.setState({modifyBudget: true})}
            title='Modify total budget'/>
        </View>}
        {this.state.modifyBudget && <View>
          {this.props.formErrors.generalError &&
            <Text>
              {this.props.formErrors.generalError}
            </Text>}
          <TextInput
            keyboardType='numeric'
            value={`${this.state.totalBudget}`}
            onChangeText={
              (totalBudget) => this.setState({totalBudget})
            }/>
          <Button
            onPress={
              () => {
                this.props.setTotalBudget(this.state.totalBudget);}
            }
            title='Save'/>
        </View>}
        <Button
          onPress={() => {
            this.props.navigation.navigate('EditCategory');
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