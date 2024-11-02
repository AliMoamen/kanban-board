import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKHLZ2uNFNQ_6LKkuMxhHiu3CYrinVinM",
  authDomain: "kanban-board-3cb47.firebaseapp.com",
  projectId: "kanban-board-3cb47",
  storageBucket: "kanban-board-3cb47.appspot.com",
  messagingSenderId: "98910180305",
  appId: "1:98910180305:web:412b03258d34d9e65746f0",
  measurementId: "G-44C824X7N9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
