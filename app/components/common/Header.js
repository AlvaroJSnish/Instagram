import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = props => {
  return (
    <View style={styles.container}>
      {props.onCancel ? (
        <TouchableOpacity onPress={props.onCancel} style={{ margin: 15 }}>
          <View>
            <Text>Cancel</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <Text style={{ margin: 15, fontWeight: 'bold' }}>{props.title}</Text>
      {props.onNext ? (
        <TouchableOpacity onPress={props.onNext} style={{ margin: 15 }}>
          <View>
            <Text style={{ color: 'blue' }}>Next</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginTop: 20
  }
});
