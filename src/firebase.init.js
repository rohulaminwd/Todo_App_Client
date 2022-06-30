// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;





// const firebaseConfig = {
//   apiKey: "AIzaSyAHKZQskNyE3duKjAEBngrMQtsB9Ka4TMY",
//   authDomain: "manufacture-5aaff.firebaseapp.com",
//   projectId: "manufacture-5aaff",
//   storageBucket: "manufacture-5aaff.appspot.com",
//   messagingSenderId: "813537792697",
//   appId: "1:813537792697:web:c685d0c2d1a4e4bf608168"
// };