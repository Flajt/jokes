// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  * as admin from "firebase-admin";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
import { env } from '$env/dynamic/private';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlwPZf8lnHPW4VJnVPrX9ODly8LT7QCCw",
  authDomain: "joker-f6c88.firebaseapp.com",
  projectId: "joker-f6c88",
  storageBucket: "joker-f6c88.appspot.com",
  messagingSenderId: "1065810019306",
  appId: "1:1065810019306:web:b93b7e446a623bd62e2893",
  databaseURL: "https://joker-f6c88-default-rtdb.europe-west1.firebasedatabase.app",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)
console.log(JSON.parse(env.FIREBASE_STRING))
export const adminApp = admin.apps.length === 0 ? admin.initializeApp({credential:admin.credential.cert(JSON.parse(env.FIREBASE_STRING)),databaseURL:"https://joker-f6c88-default-rtdb.firebaseio.com/"}) : admin.app();