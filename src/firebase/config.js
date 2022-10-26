// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsUhezcNfQfvCkW7F7IkLml0SBzRhp17c",
  authDomain: "vuejs-todo-ead65.firebaseapp.com",
  projectId: "vuejs-todo-ead65",
  storageBucket: "vuejs-todo-ead65.appspot.com",
  messagingSenderId: "921865366399",
  appId: "1:921865366399:web:23f567f6a0f9c9df02c84a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init firestore
const projectFirestore = firebase.firestore();
export {projectFirestore};