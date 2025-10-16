import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB94q4UpnuerG78eSWZsxgauMZypq4",         // your actual values
  authDomain: "quotesndnotes-01.firebaseapp.com",
  projectId: "quotesndnotes-01",
  storageBucket: "quotesndnotes-01.appspot.com",
  messagingSenderId: "793488411119",
  appId: "1:793488411119:web:5884ad62794fce3d490aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);