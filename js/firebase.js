import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, doc, setDoc, getDoc, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBO--T703GHdsBxPojedzqeHFyCaihPJJ0",
  authDomain: "buzoninteligente-71139.firebaseapp.com",
  projectId: "buzoninteligente-71139",
  storageBucket: "buzoninteligente-71139.appspot.com",
  messagingSenderId: "721834659698",
  appId: "1:721834659698:web:301f3881c27487ef4a97eb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { 
  app, db, auth, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  signOut, googleProvider, signInWithPopup, onAuthStateChanged,
  doc, setDoc, getDoc, collection, addDoc
};