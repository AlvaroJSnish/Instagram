import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import Main from './app/Main';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
    };
    firebase.initializeApp(config);
  }
  render() {
    return <Main />;
  }
}
