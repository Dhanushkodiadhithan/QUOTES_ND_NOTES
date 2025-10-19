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
// Import your auth actions for Redux

function App() {
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
        <>
          <Navbar />
          <Homepage />
        </>
      ),
      loader: getQuotesLoader,
    },
    {
      path: "/user-profile",
      element: (
        <>
          <Navbar />
          <UserProfile />
        </>
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
