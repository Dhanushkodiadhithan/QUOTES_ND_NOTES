import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Add Firestore import

// 🔹 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBQ4gplDuernwErG7Be5WZXsgauMZFypq4",
  authDomain: "quotesndnotes-01.firebaseapp.com",
  projectId: "quotesndnotes-01",
  storageBucket: "quotesndnotes-01.firebasestorage.app",
  messagingSenderId: "793408841119",
  appId: "1:793408841119:web:58804ad62794fce3d409aa",
  measurementId: "G-35064QF625",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app); // 👈 Add this line

// ✅ Initialize Auth
const auth = getAuth(app);

// ✅ Set persistence (user stays logged in after closing browser)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Firebase Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("❌ Error setting auth persistence:", error);
  });

// ✅ Exports
export { app, auth, db }; // 👈 Export db also

// ✅ Example signup function (optional)
export const signupUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
