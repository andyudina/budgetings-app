import React, { Component } from 'react';
import { Button, Picker, Text, TextInput, View } from 'react-native';

export default class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      category: this.props.categories[0].id,
    };
  }

  render() {
    return (
      <View>
        {!this.props.isCreating && <View>
        {this.props.formErrors && this.props.formErrors.generalError &&
          <Text>
            {this.props.formErrors.generalError}
          </Text>}

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

        {this.props.formErrors && this.props.formErrors.categoryError &&
          <Text>
            {this.props.formErrors.categoryError}
          </Text>}
        <Picker
          selectedValue={this.state.category}
          prompt='Select budget category'
          onValueChange={
            (category, itemIndex) => this.setState({category: category})
          }
        >
        {this.props.categories.map(
          function(category) {
            return  <Picker.Item key={category.id} 
                     label={category.name} value={category.id} />;
          }
        )}
        </Picker>
        <Button
          onPress={
            () => {
              this.props.createBudget(
                this.state.budget,
                this.state.category);
            }
          }
          title='Save'/>
          </View>}
          {this.props.isCreating && <View>
            <Text>
              Is creating
            </Text>
           </View>}
      </View>
    );
  }
}