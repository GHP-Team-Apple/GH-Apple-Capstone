import { FIREBASE_KEY } from '@env';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "gh-apple-capstone-f8e82.firebaseapp.com",
    databaseURL: "https://gh-apple-capstone-f8e82-default-rtdb.firebaseio.com",
    projectId: "gh-apple-capstone-f8e82",
    storageBucket: "gh-apple-capstone-f8e82.appspot.com",
    messagingSenderId: "985007094941",
    appId: "1:985007094941:web:ea1cd8e1372908eecbe874",
    measurementId: "G-YZDTJ9BHY9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const getUsers = async (db) => {
    const usersCollection = collection(db, 'Users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return userList;
}

export default getUsers;