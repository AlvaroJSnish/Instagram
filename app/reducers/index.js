import { combineReducers } from 'redux';
import auth from './AuthReducer';
import post from './PostReducer';
import profile from './ProfileReducer';
import highlight from './HighlightReducer';

export default combineReducers({
  auth: auth,
  post: post,
  profile: profile,
  highlight: highlight
});
