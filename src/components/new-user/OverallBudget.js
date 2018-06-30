import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default class OverallBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: this.props.totalBudget
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigateToCategories) {
      this.props.navigation.navigate('AddCategory');
      this.props.disableNavigationToCategories();
    }
  }

  render() {
    return (
      <View>
          {!this.props.isUpdating && 
            <View>
              <Text>
                Overall Budget
              </Text>
              {this.props.formErrors.generalError &&
                <Text>
                  {this.props.formErrors.generalError}
                </Text>
              }
              <TextInput
              keyboardType='numeric'
              value={`${this.state.totalBudget}`}
              onChangeText={
                (totalBudget) => this.setState({totalBudget})
              }
              />
              <Text>€</Text>
              <Text>Monthly</Text>
              <Button
                onPress={
                  () => {
                    this.props.setTotalBudget(this.state.totalBudget);}
                }
                title='Next'
              />
            </View>
           }
          {this.props.isUpdating && <Text>Updating</Text>}
      </View>
    );
  }
}