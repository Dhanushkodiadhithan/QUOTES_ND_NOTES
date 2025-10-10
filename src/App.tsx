import "./App.css";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import UploadQuotes from "./Components/UploadQuotes";
import Homepage from "./Pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getQuotesLoader } from "./loaders/getQuotesLoader"; // adjust import path

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
  },
  {
    path: "/upload-quotes",
    element: (
      <>
        <Navbar />
        <UploadQuotes />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
