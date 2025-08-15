import "./App.css";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;