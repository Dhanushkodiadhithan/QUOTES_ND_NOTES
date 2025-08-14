import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <>
      <nav className="fixed top-0 text-3xl font-bold left-0 bg-green-500 w-full backdrop-blur-sm border-b-2 border-gray-200 p-3">
         <FontAwesomeIcon icon={faQuoteRight} />
        
      </nav>
    </>
  );
}

export default App;