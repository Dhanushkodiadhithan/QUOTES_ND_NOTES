import "./App.css";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import Homepage from "./Pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getQuotesLoader } from "./loaders/getQuotesLoader"; // adjust import path
import { getUserQuotesLoader } from "./loaders/getUserQuotesLoader"; // adjust import path
// Define router with loader for homepage
const router = createBrowserRouter([
  {
    path: "/",
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
    loader: getUserQuotesLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
