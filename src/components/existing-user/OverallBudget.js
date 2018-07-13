import React, { Component } from 'react';
import { View } from 'react-native';
import Budget from 'src/containers/common/Budget';

export default class OverallBudget extends Component {
  render() {
    return (
      <View>
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