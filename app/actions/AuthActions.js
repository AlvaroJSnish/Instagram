import {
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS
} from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const createUser = (email, password) => {
  return dispatch => {
    dispatch({ type: AUTH_CREATE_USER });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => createUserSuccess(dispatch, user))
      .catch(() => createUserFail(dispatch));
  };
};

const createUserFail = dispatch => {
  dispatch({ type: AUTH_CREATE_USER_FAIL });
};

const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_CREATE_USER_SUCCESS,
    payload: user
  });

  Actions.app();
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_USER });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: AUTH_LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.app();
};
