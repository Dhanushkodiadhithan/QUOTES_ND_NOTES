import "./App.css";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Loginpage";
import Signup from "./Pages/Signup";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { getQuotesLoader } from "./loaders/getQuotesLoader";

import { useEffect, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "./Redux/Slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const auth = getAuth();

    // ✅ Firebase restores login session automatically
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email ?? "" }));
      } else {
        dispatch(clearUser());
      }
      setCheckingAuth(false); // ✅ Done checking auth state
    });

    return () => unsubscribe();
  }, [dispatch]);

  // ✅ While Firebase is restoring the session
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading session...
      </div>
    );
  }

  // ✅ Protected Route component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  // ✅ Public Route component (redirects logged-in users)
  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (user) return <Navigate to="/home-page" replace />;
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/home-page",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Homepage />
          </>
        </ProtectedRoute>
      ),
      loader: getQuotesLoader,
    },
    {
      path: "/user-profile",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <UserProfile />
          </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Navigate to={user ? "/home-page" : "/login"} replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
