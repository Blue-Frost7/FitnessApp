// data/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBI81bzweuVIaSG-97QMiXmu08dc33gj7w",
  authDomain: "fitnessgamificationapp-8a652.firebaseapp.com",
  projectId: "fitnessgamificationapp-8a652",
  storageBucket: "fitnessgamificationapp-8a652.firebasestorage.app",
  messagingSenderId: "616036805804",
  appId: "1:616036805804:web:b1c4a3eac133b0cb46c309",
  measurementId: "G-0HM8EWEXQ5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);