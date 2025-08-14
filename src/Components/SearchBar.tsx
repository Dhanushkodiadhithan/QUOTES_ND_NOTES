import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  return (
    <>
    <span className="w-[700px] relative">
          <input type="text" placeholder="Search quotes" className=" font-normal shadow-md text-lg text-gray-600 w-full ps-10 py-1 placeholder:text-md border-2 focus:border-primary rounded-md placeholder:text-gray-400 outline-none"/>
           <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-2 text-gray-400 text-lg"/>  
          </span> 
    </>
  )
}
