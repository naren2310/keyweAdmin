// Import the functions you need from the SDKs you need
const { initializeApp } = require ("firebase/app");
const { getAuth } = require ('firebase/auth');
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXpNUeFvsiT-mcLxvnOYghnbi8rLiZoQc",
  authDomain: "keywe-9f261.firebaseapp.com",
  projectId: "keywe-9f261",
  storageBucket: "keywe-9f261.appspot.com",
  messagingSenderId: "726496761690",
  appId: "1:726496761690:web:28d9179c392d5f4fa9c563"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

module.exports = {
  auth
}
