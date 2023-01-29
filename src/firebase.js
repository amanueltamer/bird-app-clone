import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA428PQm2nbbBTVNRgvb8CLwmkTY4tIJas",
    authDomain: "bird-app-clone-at.firebaseapp.com",
    projectId: "bird-app-clone-at",
    storageBucket: "bird-app-clone-at.appspot.com",
    messagingSenderId: "53796410281",
    appId: "1:53796410281:web:3d5f91aeded5ab2aa0aab8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;