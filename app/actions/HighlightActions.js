import { HIGHLIGHT_CREATE, HIGHLIGHT_FETCH_ALL } from './types';
import firebase from 'firebase';

export const fetchHighlights = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/highlights`)
      .on('value', snapshot => {
        if (snapshot.val() === null || snapshot.val() === undefined) {
          dispatch({ type: HIGHLIGHT_FETCH_ALL, payload: [] });
        } else {
          dispatch({ type: HIGHLIGHT_FETCH_ALL, payload: snapshot.val() });
        }
      });
  };
};

export const onCreateHighlight = (name, posts, coverPost) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/`)
      .child('highlights')
      .push({
        name,
        posts,
        coverPost
      })
      .then(() => {
        dispatch({
          type: HIGHLIGHT_CREATE
        });
      });
  };
};
