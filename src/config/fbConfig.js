import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    // Your web app's Firebase configuration
    apiKey: "AIzaSyDvJQJsTV05SjhLF1O2mltnMIM9E1mQdy4",
    authDomain: "net-ninja-mario-3df0b.firebaseapp.com",
    databaseURL: "https://net-ninja-mario-3df0b.firebaseio.com",
    projectId: "net-ninja-mario-3df0b",
    storageBucket: "net-ninja-mario-3df0b.appspot.com",
    messagingSenderId: "46750504203",
    appId: "1:46750504203:web:d73550e456c7146597be0e",
    measurementId: "G-HJT6NMZRBX",
    // userProfile: 'users',
    // useFirestoreForProfile: true,
    // enableRedirectHandling: false,
    // resetBeforeLogin: false
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore();

export default firebase;