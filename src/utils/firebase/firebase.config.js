'use strict'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCwQo5_fcYxHoecepeW9WCBsGlP-pepwrg',
  authDomain: 't-dev-game.firebaseapp.com',
  projectId: 't-dev-game',
  storageBucket: 't-dev-game.appspot.com',
  messagingSenderId: '784703636267',
  appId: '1:784703636267:web:f75f024d44a80d19e87b6e'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

export { auth, db }
