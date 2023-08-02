import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const deccosFirebaseConfig = {
  apiKey: "AIzaSyDfHDAPUhBE-t8k41EHbOVpsy2q0kzKe_o",
  authDomain: "deccos-app.firebaseapp.com",
  projectId: "deccos-app",
  storageBucket: "deccos-app.appspot.com",
  messagingSenderId: "53449363588",
  appId: "1:53449363588:web:6213c4bfb2623bd944b2d1",
  measurementId: "G-EQ2LTK19DD"
};

const deccosApp = initializeApp(deccosFirebaseConfig, 'deccos');
const dbDeccos = getFirestore(deccosApp);

export { dbDeccos }