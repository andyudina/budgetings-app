import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'src/configure-store';
import { getCurrentUser } from 'src/actions/user';
import { getCategories } from 'src/actions/categories';
import Navigation from 'src/containers/Navigation';

// TODO: populate information about budgets, user, categories etc.
// on first app load
const store = configureStore()
store.dispatch(getCurrentUser())
store.dispatch(getCategories())

export default class App extends Component {
  render() {
    return  (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}