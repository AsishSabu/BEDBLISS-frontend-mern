import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCXb0jp7ElwAamo3woyIWxLx5XdiiALDc0",
  authDomain: "bedbliss.firebaseapp.com",
  projectId: "bedbliss",
  storageBucket: "bedbliss.appspot.com",
  messagingSenderId: "795475586008",
  appId: "1:795475586008:web:543b41d6ea07acb2efe0ad",
  measurementId: "G-T24KHX5NX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider();
const facebookProvider=new FacebookAuthProvider();
export {auth,googleProvider,facebookProvider}
