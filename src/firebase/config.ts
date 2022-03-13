import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCtqUkrqjQYv-bbagjzow9S7tq-LtAiOPA',
  authDomain: 'thingy-tracker.firebaseapp.com',
  projectId: 'thingy-tracker',
  storageBucket: 'thingy-tracker.appspot.com',
  messagingSenderId: '249715868626',
  appId: '1:249715868626:web:f01f2d4f1f73aa7ef0fe0b'
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
