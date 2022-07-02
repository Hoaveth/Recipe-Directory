import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8MvrRUujhj9iYqWRfvgigML_J8fm0zwY",
  authDomain: "cooking-ninja-site-8ff34.firebaseapp.com",
  projectId: "cooking-ninja-site-8ff34",
  storageBucket: "cooking-ninja-site-8ff34.appspot.com",
  messagingSenderId: "657215602184",
  appId: "1:657215602184:web:01cc36f39ae4c57fbf1bbd",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
