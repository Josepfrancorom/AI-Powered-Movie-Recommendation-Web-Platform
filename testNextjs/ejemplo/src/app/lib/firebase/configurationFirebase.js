import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "movierecomendation-ec620.firebaseapp.com",
    projectId: "movierecomendation-ec620",
    storageBucket: "movierecomendation-ec620.appspot.com",
    messagingSenderId: "406713367769",
    appId: "1:406713367769:web:48d42b6ef30103e83912c8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Function to sign in with Google
export const signInWithGoogle = () => {

    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(getAuth(app),provider);
    return result;
};

// Function to register a user with email and password
export const registerWithEmail = (email, password) =>{
    const newUser = createUserWithEmailAndPassword(getAuth(app),email,password);
    return newUser;
}

// Function to sign in with email and password
export const loginWithEmail = (email, password) =>{
    const loginUser = signInWithEmailAndPassword(getAuth(app),email,password);
    return loginUser;
}

// Function to sign out
export const signOut = () =>{
    try {
        firebase.auth().signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
};