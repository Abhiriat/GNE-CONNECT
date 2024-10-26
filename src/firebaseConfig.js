// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey:"AIzaSyA17n_GSrLoucjGwnSR6uKnXijVQKHGdpI",
  authDomain: "gne-connect.firebaseapp.com",
  databaseURL:"https://gne-connect-default-rtdb.firebaseio.com/",
  projectId:"gne-connect",
  storageBucket: "gne-connect.appspot.com",
  messagingSenderId:"369621962950",
  appId:"1:369621962950:web:06d6f37f90feb6d040c7c7",
  measurementId: "G-T0FZZ5XY0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;