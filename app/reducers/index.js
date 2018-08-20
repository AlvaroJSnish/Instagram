import { combineReducers } from 'redux';
import auth from './AuthReducer';
import post from './PostReducer';
import profile from './ProfileReducer';

export default combineReducers({
  auth: auth,
  post: post,
  profile: profile
});
