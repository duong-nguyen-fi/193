import firebase from 'firebase';
import firestore from 'firebase/firestore'
import config_ from './config_'

require('firebase/firestore')

const settings = {timestampsInSnapshots: true};
var config = {
    apiKey: config_.apiKey,
    authDomain: "bachtuoc193-de09e.firebaseapp.com",
    databaseURL: config_.databaseURL,
    projectId: "bachtuoc193-de09e",
    storageBucket: "bachtuoc193-de09e.appspot.com",
    messagingSenderId: "636955558116"
  };
  firebase.initializeApp(config);

  firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          console.log("fail to enable persistence. Multiple tab is open. Only 1 tab supported");

      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log("Browser doesn't support persistence");
      }
  });
  export default firebase;