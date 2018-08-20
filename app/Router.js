import React from 'react';
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AddPost from './components/post/AddPost';
import ConfigPost from './components/post/ConfigPost';
import Home from './components/home/Home';
import Explore from './components/explore/Explore';
import Profile from './components/profile/Profile';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditProfile from './components/profile/EditProfile';

const HomeIcon = () => <Ionicons name="md-home" size={25} />;
const ExploreIcon = () => <Ionicons name="md-search" size={25} />;
const AddPostIcon = () => <EvilIcons name="plus" size={25} />;
const ProfileIcon = () => <Icon name="user" size={25} />;

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Stack>
      <Stack key="app" hideNavBar panHandlers={null}>
        <Tabs showLabel={false}>
          <Scene key="home" component={Home} icon={HomeIcon} title="Home" />
          <Scene key="addpost" component={AddPost} icon={AddPostIcon} hideNavBar hideTabBar />
          <Scene key="explore" component={Explore} icon={ExploreIcon} />
          <Scene key="profile" component={Profile} icon={ProfileIcon} hideNavBar />
        </Tabs>
        <Scene key="configPost" component={ConfigPost} />
        <Scene key="editProfile" component={EditProfile} />
      </Stack>
    </Stack>
  </Router>
);

export default RouterComponent;
