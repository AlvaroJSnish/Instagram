import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { like, dislike, sendMessage } from '../../actions/PostActions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Input from '../common/Input';

class Post extends Component {
  state = {
    message: '',
    showMessages: false
  };

  like = () => {
    this.props.like(this.props.postKey, this.props.likes);
  };

  dislike = () => {
    this.props.dislike(this.props.postKey, this.props.likes);
  };

  onWriteComment = text => {
    this.setState({
      message: text
    });
  };

  onSendComment = () => {
    this.props.sendMessage(this.props.postKey, this.props.comments_number, this.state.message);
    this.setState({
      message: ''
    });
  };

  renderHeart = () => {
    if (this.props.liked) {
      return (
        <TouchableOpacity onPress={this.dislike.bind(this)}>
          <View>
            <SimpleLineIcons name="heart" size={30} style={{ marginRight: 5 }} color="red" />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.like.bind(this)}>
          <View>
            <SimpleLineIcons name="heart" size={30} style={{ marginRight: 5 }} />
          </View>
        </TouchableOpacity>
      );
    }
  };

  renderImage = () => {
    if (this.props.liked) {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={this.dislike.bind(this)}>
          <View>
            <Image source={{ uri: this.props.image }} style={styles.image} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={this.like.bind(this)}>
          <View>
            <Image source={{ uri: this.props.image }} style={styles.image} />
          </View>
        </TouchableOpacity>
      );
    }
  };

  renderSendMessage = () => {
    if (this.state.message.length > 0) {
      return (
        <TouchableOpacity style={{ flex: 0.2, marginTop: 27 }} onPress={this.onSendComment.bind(this)}>
          <View>
            <Text style={{ color: '#0984e3' }}>Send</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  renderShowMessages = () => {
    if (!this.state.showMessages) {
      return (
        <TouchableOpacity onPress={this.showMessages.bind(this)} style={{ marginLeft: 15 }}>
          <View>
            <Text style={styles.textSeeComments}>See the {this.props.comments_number} comments</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.showMessages.bind(this)} style={{ marginLeft: 15 }}>
          <View>
            <Text style={styles.textSeeComments}>Close comments</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  showMessages = () => {
    this.setState({
      showMessages: !this.state.showMessages
    });
  };

  renderMessages = () => {
    if (this.props.comments !== undefined) {
      const arrayMessages = Object.values(this.props.comments);
      const arrayKeys = Object.keys(this.props.comments);
      if (this.state.showMessages) {
        return arrayMessages.map((message, i) => {
          return (
            <View style={styles.messages} key={arrayKeys[i]}>
              <Text style={[styles.username, { fontSize: 13 }]}>{message.username}</Text>
              <Text style={[styles.text, { fontSize: 13 }]}>{message.message}</Text>
            </View>
          );
        });
      }
    }
  };

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Image source={{ uri: this.props.userpic }} style={styles.userPic} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.usernameTop}>{this.props.username}</Text>
            <Text style={styles.location}>{this.props.location}</Text>
          </View>
        </View>
        {this.renderImage()}
        <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 1, marginBottom: 1 }}>
          {this.renderHeart()}
        </View>
        <Text style={styles.likes}>{this.props.likes} likes</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.username}>{this.props.username}</Text>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Input
            onChange={this.onWriteComment.bind(this)}
            styles={styles.writeComment}
            value={this.state.message}
            placeholder="Write a message..."
          />
          {this.renderSendMessage()}
        </View>
        <View style={{ alignContent: 'center' }}>{this.renderShowMessages()}</View>
        <View style={styles.seeComments}>{this.renderMessages()}</View>
      </View>
    );
  }
}

export default connect(
  null,
  { like, dislike, sendMessage }
)(Post);

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 300,
    margin: 15,
    marginBottom: 1,
    marginTop: 1
  },
  likes: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 1,
    marginLeft: 15
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 1,
    marginRight: 5,
    marginBottom: 1
  },
  text: {
    fontSize: 15,
    margin: 15,
    marginTop: 1,
    marginLeft: 5,
    marginBottom: 1
  },
  seeComments: {
    margin: 15,
    marginTop: 1,
    marginLeft: 15
  },
  textSeeComments: {
    fontSize: 15,
    color: 'grey'
  },
  usernameTop: {
    margin: 15,
    marginLeft: 5,
    marginBottom: 2,
    fontWeight: 'bold'
  },
  userPic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 15,
    marginLeft: 15,
    marginBottom: 3,
    marginRight: 2
  },
  location: {
    marginLeft: 5,
    marginBottom: 3,
    color: 'grey'
  },
  writeComment: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    flex: 0.8
  },
  messages: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 3
  }
});
