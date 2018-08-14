import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import Main from './app/Main';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyD2RBlAfBaTGBjAToZk3y8xBkQe8qxzimE',
      authDomain: 'instagram-alvaro.firebaseapp.com',
      databaseURL: 'https://instagram-alvaro.firebaseio.com',
      projectId: 'instagram-alvaro',
      storageBucket: 'instagram-alvaro.appspot.com',
      messagingSenderId: '908451820998'
    };
    firebase.initializeApp(config);
  }
  render() {
    return <Main />;
  }
}
