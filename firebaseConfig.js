import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrTUJ7X_1J7ZE5A_fIh-TiMmA6TgeyaKc",
  authDomain: "gh-apple-capstone-f8e82.firebaseapp.com",
  databaseURL: "https://gh-apple-capstone-f8e82-default-rtdb.firebaseio.com",
  projectId: "gh-apple-capstone-f8e82",
  storageBucket: "gh-apple-capstone-f8e82.appspot.com",
  messagingSenderId: "985007094941",
  appId: "1:985007094941:web:ea1cd8e1372908eecbe874",
  measurementId: "G-YZDTJ9BHY9",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export {
  firebase,provider, auth, db as default,
};