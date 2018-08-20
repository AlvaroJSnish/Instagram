import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = props => (
  <TouchableOpacity style={[styles.container, props.styles]} onPress={props.onPress} disabled={props.disabled}>
    <View>
      <Text style={[styles.text, props.textStyle]}>{props.textButton}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#0984e3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
});
