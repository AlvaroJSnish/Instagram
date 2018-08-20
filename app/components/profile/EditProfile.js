import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Platform, StyleSheet } from 'react-native';
import Header from '../common/Header';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { onSaveChanges } from '../../actions/ProfileActions';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class EditProfile extends Component {
  state = {
    userpic: '',
    name: '',
    username: '',
    web: '',
    bio: '',
    phone: '',
    sex: ''
  };

  cancelEdit() {
    Actions.pop();
  }

  componentWillMount() {
    console.log(this.props);
    this.setState({
      userpic: this.props.userpic,
      name: this.props.name_profile,
      username: this.props.username,
      web: this.props.web,
      bio: this.props.bio,
      phone: this.props.phone,
      sex: this.props.sex
    });
  }

  onChangeName(text) {
    this.setState({
      name: text
    });
  }

  onChangeUsername(text) {
    this.setState({
      username: text
    });
  }

  onChangeBio(text) {
    this.setState({
      bio: text
    });
  }

  onChangePhone(text) {
    this.setState({
      phone: text
    });
  }

  onChangeSex(text) {
    this.setState({
      sex: text
    });
  }

  onChangeBio(text) {
    this.setState({
      bio: text
    });
  }

  onChangeWeb(text) {
    this.setState({
      web: text
    });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.onUploadImage(response.uri).then(url => {
          this.setState({
            userpic: url
          });
        });
      }
    });
  }

  onUploadImage(uri, mime = 'image/jpeg') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const { currentUser } = firebase.auth();

      const imageRef = firebase
        .storage()
        .ref(`/images/${currentUser.uid}`)
        .child('profile_pic');

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  onSaveChanges() {
    this.props.onSaveChanges(
      this.state.userpic,
      this.state.name,
      this.state.username,
      this.state.web,
      this.state.bio,
      this.state.phone,
      this.state.sex
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Edit profile" onNext={this.onSaveChanges.bind(this)} onCancel={this.cancelEdit.bind(this)} />
        <ScrollView>
          <View style={styles.pic}>
            <Image source={{ uri: this.state.userpic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <TouchableOpacity style={{ margin: 5 }} onPress={this.selectPhotoTapped.bind(this)}>
              <View>
                <Text style={{ fontSize: 15, color: '#00a8ff' }}>Change profile pic</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.publicInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 10, marginRight: 5, width: 80, height: 40, fontSize: 15 }}> Name </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40, borderBottomColor: '#dcdde1', borderBottomWidth: 1 }}
                value={this.state.name}
                onChangeText={this.onChangeName.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 15, marginRight: 5, width: 80, height: 40, fontSize: 15 }}> Username </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40, borderBottomColor: '#dcdde1', borderBottomWidth: 1 }}
                value={this.state.username}
                onChangeText={this.onChangeUsername.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 15, marginRight: 5, width: 80, height: 40, fontSize: 15 }}> Web </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40, borderBottomColor: '#dcdde1', borderBottomWidth: 1 }}
                value={this.state.web}
                onChangeText={this.onChangeWeb.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 15, marginRight: 5, width: 80, height: 40, fontSize: 15 }}> Bio </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40 }}
                value={this.state.bio}
                onChangeText={this.onChangeBio.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.privateInfo}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5, marginBottom: 15, marginLeft: 5 }}>
              Private info
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 15, marginRight: 5, width: 80, height: 40, fontSize: 15 }}> Phone </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40, borderBottomColor: '#dcdde1', borderBottomWidth: 1 }}
                value={this.state.phone}
                onChangeText={this.onChangePhone.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 15, marginRight: 5, width: 80, height: 40, fontSize: 15 }}> Sex </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40, borderBottomColor: '#dcdde1', borderBottomWidth: 1 }}
                value={this.state.sex}
                onChangeText={this.onChangeSex.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  { onSaveChanges }
)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  pic: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f5f6fa',
    borderBottomColor: '#dcdde1',
    borderBottomWidth: 1
  },
  publicInfo: {
    width: '100%',
    padding: 15,
    borderBottomColor: '#dcdde1',
    borderBottomWidth: 1
  },
  privateInfo: {
    width: '100%',
    padding: 15
  }
});
