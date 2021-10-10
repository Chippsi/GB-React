
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDatabase, ref, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBz68BLApKRDEFrP1qvkbT-vsC7YoMI3mw",
    authDomain: "fire-chat-2c67c.firebaseapp.com",
    databaseURL: "https://fire-chat-2c67c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fire-chat-2c67c",
    storageBucket: "fire-chat-2c67c.appspot.com",
    messagingSenderId: "651075939922",
    appId: "1:651075939922:web:320c3679594a498b20798b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getDatabase()
export const CHATS_REF = ref(db, 'chats')
export const GET_CHATID_REF = (chatID) => child(CHATS_REF, chatID)
export const GET_MESSAGES_REF = (chatID) => child(GET_CHATID_REF(chatID), 'messages')

export const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .catch( err => console.log(err) )
} 
export const logOut = () => signOut(auth)