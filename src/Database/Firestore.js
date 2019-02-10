import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

require('firebase/firestore')

const settings = {timestampsInSnapshots: true};
var config = {
    apiKey: "AIzaSyBqvvhFtFFzxH1O-Wi--eO08AYfFIg7bvw",
    authDomain: "bachtuoc193-de09e.firebaseapp.com",
    databaseURL: "https://bachtuoc193-de09e.firebaseio.com",
    projectId: "bachtuoc193-de09e",
    storageBucket: "bachtuoc193-de09e.appspot.com",
    messagingSenderId: "636955558116"
  };
  firebase.initializeApp(config);
  export default firebase;