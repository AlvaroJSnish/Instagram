import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const HighlightIcon = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <View>
      <Image style={styles.image} source={{ uri: props.coverPost }} />
    </View>
    <Text>{props.name}</Text>
  </TouchableOpacity>
);

export default HighlightIcon;

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 80,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 2
  }
});
