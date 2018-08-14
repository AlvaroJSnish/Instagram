import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = props => <Text style={styles.text}>{props.title}</Text>;

export default Title;

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 30
  }
});
