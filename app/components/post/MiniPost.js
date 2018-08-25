import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class MiniPost extends Component {
  state = {
    selected: false
  };

  selectPost(image) {
    this.setState({
      selected: true
    });
    this.props.selectPost(image);
  }

  unselectPost(image) {
    this.setState({
      selected: false
    });
    this.props.unselectPost(image);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={
          this.state.selected ? () => this.unselectPost(this.props.image) : () => this.selectPost(this.props.image)
        }
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: this.props.image }}
            style={[styles.image, this.state.selected ? { opacity: 0.3 } : { opacity: 1 }]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 122.5,
    height: 122.5,
    margin: 1
  }
});
