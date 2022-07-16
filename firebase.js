import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRUgp1G6l4XkNFdPszKW1hyxZ85wHh9i8",
  authDomain: "twitterclone-30614.firebaseapp.com",
  projectId: "twitterclone-30614",
  storageBucket: "twitterclone-30614.appspot.com",
  messagingSenderId: "994584106422",
  appId: "1:994584106422:web:378c5dfba83fdb362e5d17"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export {db,storage};