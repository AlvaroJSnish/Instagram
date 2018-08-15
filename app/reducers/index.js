import { combineReducers } from 'redux';
import auth from './AuthReducer';
import post from './PostReducer';

export default combineReducers({
  auth: auth,
  post: post
});
