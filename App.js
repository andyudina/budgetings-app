import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from 'src/configure-store'
import { getCurrentUser } from 'src/actions/user'
import Navigation from 'src/containers/Navigation';

const store = configureStore()
store.dispatch(getCurrentUser())

export default class App extends Component {
  render() {
    return  (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}