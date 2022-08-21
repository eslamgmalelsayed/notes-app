// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyA5S1SfVla-bJNE4rTgA6LicE7_ewBLHt4',
  authDomain: 'noteballs-fed2e.firebaseapp.com',
  projectId: 'noteballs-fed2e',
  storageBucket: 'noteballs-fed2e.appspot.com',
  messagingSenderId: '1011919687652',
  appId: '1:1011919687652:web:0d12d266e3bca31501c1f1'
};

// Initialize Firebas
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export {
    db,
    auth
}
