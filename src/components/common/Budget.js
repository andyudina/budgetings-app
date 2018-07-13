import React, { Component } from 'react';
import { Button, Picker, Text, TextInput, View } from 'react-native';

export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: this.props.amount,
    };
  }

  render() {
    console.log(this.state.budget, this.props.id);
    return (
      <View>
        {!this.props.isUpdating && <View>
          {this.props.formErrors && this.props.formErrors.generalError &&
            <Text>
              {this.props.formErrors.generalError}
            </Text>}

          {this.props.modify && <View>
            {this.props.formErrors && this.props.formErrors.amountError &&
              <Text>
                {this.props.formErrors.amountError}
              </Text>}
            <TextInput
              keyboardType='numeric'
              value={`${this.state.budget}`}
              onChangeText={
                (budget) => this.setState({budget})
            }/>
            <Button
              onPress={
                () => {
                   this.props.updateBudget(
                    parseInt(this.state.budget),
                    this.props.id);
                }
              }
              title='Save'/>
          </View>}

          {!this.props.modify && <View>
            <Text>
              {this.props.category.name} 
              {this.props.totalExpensesInCurrentMonth} / {this.state.budget}
            </Text>
            <Button
              onPress={
                () => {
                   this.props.tryUpdateBudget(this.props.id);
                }
              }
              title='Update'/>
            </View>}
          <Button
            onPress={
              () => {
                   this.props.deleteBudget(this.props.id);
                }
              }
            title='Delete'/>
          </View>}
          {this.props.isUpdating && <View>
            <Text>
              Is updating
            </Text>
           </View>}
      </View>
    );
  }
}