import * as firebase from 'firebase';
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
  export default firebase;