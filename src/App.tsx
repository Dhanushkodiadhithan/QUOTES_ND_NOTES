import "./App.css";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import UploadQuotes from "./Components/UploadQuotes";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        {/* This Navbar is used in all pages */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/upload-quotes" element={<UploadQuotes />} />
        </Routes>
      </Router>
    </>
  );
}
 
export default App;