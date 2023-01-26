import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0oj34MrrFvXzNUXeStsR_PsiRV2vAPl4",
  authDomain: "finpact-c522a.firebaseapp.com",
  projectId: "finpact-c522a",
  storageBucket: "finpact-c522a.appspot.com",
  messagingSenderId: "831280003631",
  appId: "1:831280003631:web:03461d14747f3ab28424da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth }