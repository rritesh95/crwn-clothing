import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBjWyseW8rEw08bi-c1FFOxKU7fUyZB5k8",
    authDomain: "crwn-db-90478.firebaseapp.com",
    projectId: "crwn-db-90478",
    storageBucket: "crwn-db-90478.appspot.com",
    messagingSenderId: "494779406718",
    appId: "1:494779406718:web:51962e28b425dca21ebb2f"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;