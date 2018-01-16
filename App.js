/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';

import { Provider } from 'react-redux';
import Application from './pages/Application';
import Login from './src/components/login/Login';
import { loadState, saveState } from './redux/store/localStorage.js';
import './ReactotronConfig.js';
import createAppStore from './redux/store/createAppStore';
import { PersistGate } from 'redux-persist/lib/integration/react'


const {persistor, store} = createAppStore();

// alert(JSON.stringify(persistedState));
// store.subscribe(() => {
//   alert("state change" + JSON.stringify(store.getState()));
//   saveState(store.getState());
// });

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Application />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
