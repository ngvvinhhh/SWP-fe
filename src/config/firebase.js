// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKy_RstJ_sikald7eCdEcylqnppKPF_gc",
  authDomain: "birthdaykids-353e5.firebaseapp.com",
  projectId: "birthdaykids-353e5",
  storageBucket: "birthdaykids-353e5.appspot.com",
  messagingSenderId: "420161352072",
  appId: "1:420161352072:web:e9fb3aaa6e533fbd6a0a3d",
  measurementId: "G-49Y56QS0HZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export { storage };
