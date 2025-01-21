// firebaseConfig.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your Firebase project's API key
  authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Firebase project's auth domain
  projectId: "YOUR_PROJECT_ID", // Replace with your Firebase project's project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Optional: Add if you use Firebase Storage
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Optional: Firebase messaging sender ID
  appId: "YOUR_APP_ID", // Firebase app ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;
