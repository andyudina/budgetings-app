import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import Budget from 'src/containers/common/Budget';
import TotalBudget from 'src/containers/common/TotalBudget';

export default class OverallBudget extends Component {

  render() {
    return (
      <View>
        <TotalBudget showSpentBudget="true"/>
       {
          this.props.budgets.map(
            (budget, i) => {
              return <Budget {...budget} key={budget.id} />;
            }
        )
      }
      </View>
    );
  }
}