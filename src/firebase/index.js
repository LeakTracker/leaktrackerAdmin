import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVHIdD-dL1qcU0gf-rydqnZhA6ZhdL3zE",
  authDomain: "water-loss.firebaseapp.com",
  projectId: "water-loss",
  storageBucket: "water-loss.appspot.com",
  messagingSenderId: "310274908479",
  appId: "1:310274908479:web:4586f34f19193a2c82b38a",
  measurementId: "G-ZE3W0VRXZV"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
window.db = db;

export { auth, db }