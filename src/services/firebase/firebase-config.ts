// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'tiktok-auth-6ccc2.firebaseapp.com',
  projectId: 'tiktok-auth-6ccc2',
  storageBucket: 'tiktok-auth-6ccc2.appspot.com',
  messagingSenderId: '138123206594',
  appId: '1:138123206594:web:faad598c8ca1c22702805b',
  measurementId: 'G-2KHTN53NV3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
