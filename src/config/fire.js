import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAFo1h1JapdUC3zT_m_fns69UmD41wI6Q4",
    authDomain: "groups-n-griffins.firebaseapp.com",
    projectId: "groups-n-griffins",
    storageBucket: "groups-n-griffins.appspot.com",
    messagingSenderId: "1019692112643",
    appId: "1:1019692112643:web:96bdd115faa9eb28036736",
    measurementId: "G-7K3K68RFFX"
  };

const fire = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = getFirestore(fire);
export default fire;