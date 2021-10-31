import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCwPEAnFH2e1o_-VfUWi7KYl4Ax9NfWAz4",
  authDomain: "englishcenter-bd4ab.firebaseapp.com",
  projectId: "englishcenter-bd4ab",
  storageBucket: "englishcenter-bd4ab.appspot.com",
  messagingSenderId: "786660928325",
  appId: "1:786660928325:web:d9804ec02de059e894ec2c",
  measurementId: "G-JE1GX84JGQ"
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
