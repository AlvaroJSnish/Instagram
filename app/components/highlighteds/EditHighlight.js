import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import Header from '../common/Header';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { onCreateHighlight } from '../../actions/HighlightActions';

class EditHighlight extends Component {
  state = {
    posts: this.props.data,
    name: ''
  };

  onCancel() {
    Actions.pop();
  }

  onChangeName(text) {
    this.setState({
      name: text
    });
  }

  onCreateHighlight() {
    this.props.onCreateHighlight(this.state.name, this.state.posts, this.state.posts[0]);
    Actions.profile();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onCancel={this.onCancel.bind(this)} title="Edit Highlight" onNext={this.onCreateHighlight.bind(this)} />
        <View style={styles.innerContainer}>
          <Image source={{ uri: this.state.posts[0] }} style={styles.image} />
          <TextInput
            placeholder="Edit name"
            onChangeText={this.onChangeName.bind(this)}
            value={this.state.name}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { onCreateHighlight }
)(EditHighlight);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10
  },
  input: {
    height: 40,
    width: 100,
    marginLeft: 25
  }
});
