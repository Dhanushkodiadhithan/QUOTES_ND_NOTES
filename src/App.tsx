import "./App.css";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Loginpage";
import Signup from "./Pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { getQuotesLoader } from "./loaders/getQuotesLoader";
import { useEffect, useState, } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
// Import your auth actions for Redux
import { setUser, clearUser } from "./Redux/Slices/authslice"; // adjust paths

// Wrapper to protect routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: any) => state.auth.currentUser);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializableUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
        dispatch(setUser(serializableUser)); // store user in Redux
      } else {
        dispatch(clearUser()); // clear user on sign out
      }
      setLoading(false);
    });
    return unsubscribe; // cleanup subscription
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home-page",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Homepage />
        </ProtectedRoute>
      ),
      loader: getQuotesLoader,
    },
    {
      path: "/user-profile",
      element: (
        <ProtectedRoute>
          <Navbar />
          <UserProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
