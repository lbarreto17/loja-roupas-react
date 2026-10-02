import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA5hETED-EUpPcYu6x9QsAipReZXPw6wGA",
  authDomain: "loja-roupas-react.firebaseapp.com",
  projectId: "loja-roupas-react",
  storageBucket: "loja-roupas-react.firebasestorage.app",
  messagingSenderId: "851800250251",
  appId: "1:851800250251:web:db0deea0483734147c418e",
  measurementId: "G-KEB89SNE75"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)