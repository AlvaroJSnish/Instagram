import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../common/Header';
import { Actions } from 'react-native-router-flux';
import MiniPost from '../post/MiniPost';

export default class CreateHighlight extends Component {
  state = {
    images: []
  };

  onCancel() {
    Actions.pop();
  }

  onNext() {
    Actions.editHighlight(this.state.images);
  }

  selectPost(post) {
    this.setState({
      images: [...this.state.images, post]
    });
  }

  unselectPost(post) {
    let newState = this.state.images.filter(image => {
      return image !== post;
    });

    this.setState({
      images: newState
    });
  }

  renderPosts() {
    const postsKeys = Object.keys(this.props.data);
    const postsArray = Object.values(this.props.data);

    return postsArray.map((post, i) => {
      return (
        <MiniPost
          key={postsKeys[i]}
          {...post}
          selectPost={() => this.selectPost(post.image)}
          unselectPost={() => this.unselectPost(post.image)}
        />
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onCancel={this.onCancel.bind(this)}
          title="Select photos"
          onNext={this.state.images.length > 0 ? this.onNext.bind(this) : null}
        />
        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>{this.renderPosts()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
