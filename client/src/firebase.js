// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// for image:
import { getStorage} from "firebase/storage"; 
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABpVoH18-SyiOe8Pl2BbAfMkhU1Ma9RfQ",
  authDomain: "rentify-7d4ee.firebaseapp.com",
  projectId: "rentify-7d4ee",
  storageBucket: "rentify-7d4ee.appspot.com",
  messagingSenderId: "578198051868",
  appId: "1:578198051868:web:1fd9925b059bc30eda93d9",
  measurementId: "G-GQ9VX4NDSG"
};


const app = initializeApp(firebaseConfig);
// Initialize Firebase
const auth = getAuth(app);
// export const db = getFirestore(app);
const db = getFirestore(app); // firebase.firestore(); if do the other way
const storage = getStorage(app);// firebase.storage();

export { auth, db, storage };