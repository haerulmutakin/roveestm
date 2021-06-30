import firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_F_API_KEY,
    authDomain: process.env.REACT_APP_F_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_F_PROJECT_ID,
    storageBucket: process.env.REACT_APP_F_STORAGE_BUCKER,
    messagingSenderId: process.env.REACT_APP_F_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_F_APP_ID,
  };

  firebase.initializeApp(firebaseConfig);
  export const Auth = firebase.auth();
  export default firebase;