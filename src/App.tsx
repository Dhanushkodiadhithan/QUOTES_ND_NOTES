import "./App.css";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Loginpage";
import Signup from "./Pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { getQuotesLoader } from "./loaders/getQuotesLoader";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "./Redux/Slices/authSlice";

// Wrapper to protect routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: any) => state.auth.currentUser);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

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
  // Redirect root to login or home depending on auth (optional)
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser({ email: user.email ?? "" }));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return () => unsub();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
