import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA428PQm2nbbBTVNRgvb8CLwmkTY4tIJas",
    authDomain: "bird-app-clone-at.firebaseapp.com",
    projectId: "bird-app-clone-at",
    storageBucket: "bird-app-clone-at.appspot.com",
    messagingSenderId: "53796410281",
    appId: "1:53796410281:web:3d5f91aeded5ab2aa0aab8"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };