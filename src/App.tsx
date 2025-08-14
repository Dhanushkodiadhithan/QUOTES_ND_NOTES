import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./Components/SearchBar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function App() {
  return (
    <>
      <nav className="fixed flex align-center justify-between top-0 text-3xl font-bold left-0 w-full backdrop-blur-sm border-b-2 border-gray-200 p-3 px-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faQuoteRight} className="text-primary" />
          <span className="text-2xl font-bold font-serif">QUOTES_ND_NOTES</span>
        </div>
        <div className="flex items-center">
          <SearchBar />
        </div>
        <div className="border-2 border-primary rounded-full p-2 flex items-center justify-center text-[25px] bg-primary text-white cursor-pointer">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </nav>
    </>
  );
}

export default App;
