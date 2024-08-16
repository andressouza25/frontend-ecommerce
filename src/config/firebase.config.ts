import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBeUkz_FcJydXsgYe73l60D5cmlbQ6SPBI',
  authDomain: 'club-ecommerce-e5d65.firebaseapp.com',
  projectId: 'club-ecommerce-e5d65',
  storageBucket: 'club-ecommerce-e5d65.appspot.com',
  messagingSenderId: '361688005463',
  appId: '1:361688005463:web:66eebba2d7edc4b18f9c12'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
