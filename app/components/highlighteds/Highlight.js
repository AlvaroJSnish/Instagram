import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

let counter = 0;

export default class Highlight extends Component {
  componentWillMount() {
    this.setState({
      image: this.props.data.coverPost,
      images: this.props.data.posts
    });
  }

  /*

  EXPERIMENTAL TRY, YOU CAN REDEFINE IT!

  componentWillMount() {
    this.setState({
      image: this.props.data.coverPost
    });

    this.goBack = setTimeout(() => {
      Actions.profile();
    }, this.props.data.posts.length * 1000);

    this.changeImage = setInterval(() => {
      this.setState({ image: this.props.data.posts[current] });
      current++;
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.changeImage);
    clearTimeout(this.goBack);
  }
  */

  onChangeImage = () => {
    if (counter === this.state.images.length - 1) {
      counter = 0;
      Actions.pop();
    } else {
      this.setState({
        image: this.state.images[++counter]
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.onChangeImage.bind(this)} activeOpacity={1}>
          <View>
            <Image source={{ uri: this.state.image }} style={{ height: '100%' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
