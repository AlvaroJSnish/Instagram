import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Stack>
    </Stack>
  </Router>
);

export default RouterComponent;
