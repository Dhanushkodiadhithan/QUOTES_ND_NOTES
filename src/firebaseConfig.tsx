import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQ4gplDuernwErG7Be5WZXsgauMZFypq4",
  authDomain: "quotesndnotes-01.firebaseapp.com",
  projectId: "quotesndnotes-01",
  storageBucket: "quotesndnotes-01.firebasestorage.app",
  messagingSenderId: "793408841119",
  appId: "1:793408841119:web:58804ad62794fce3d409aa",
  measurementId: "G-35064QF625"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to local (default storage) - persists across tabs and sessions
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence is set successfully
    console.log("Firebase auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence", error);
  });

export { auth };

export const signupUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
