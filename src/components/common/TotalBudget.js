import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default class TotalBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBudget: this.props.totalBudget,
    };
  }

  render() {
    return (
      <View>
        {!this.props.modifyBudget && <View>
          {this.props.showSpentBudget && <Text>
            { this.props.spentBudget } /
          </Text>}
          <Text>
            { this.props.totalBudget }
          </Text>
          <Button
            onPress={() => this.props.modifyTotalBudget()}
            title='Modify total budget'/>
        </View>}
        {this.props.modifyBudget && <View>
        {!this.props.isUpdating && <View>
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
        {this.props.isUpdating && <View>
          <Text>
            Is updating
          </Text>
        </View>}
        </View>}
      </View>
    );
  }
}