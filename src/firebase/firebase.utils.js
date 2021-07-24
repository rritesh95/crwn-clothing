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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log("error creating user", error.message);
      }
    }

    return userRef;
  }

  // used to load one time data of shop in firebase
  // export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  //   const collectionRef = firestore.collection(collectionKey);
    
  //   const batch = firestore.batch();
  //   objectToAdd.forEach(obj => {
  //     const newDocRef = collectionRef.doc();
  //     batch.set(newDocRef, obj)  
  //   });

  //   return await batch.commit()
  // }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
      const { title, items } = doc.data();

      return {
        routeName : encodeURI(title.toLowerCase()),
        id : doc.id,
        title,
        items,
      }
    })

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  }

  firebase.initializeApp(config);

  export const getCurrentUser = () => {
    return new Promise(( resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged( userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    })
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;