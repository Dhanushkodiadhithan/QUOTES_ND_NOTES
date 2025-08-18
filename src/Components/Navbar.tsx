import { GoPerson } from "react-icons/go";
import { FaQuoteRight } from "react-icons/fa";
import SearchBar from "./SearchBar";
export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b-2 border-gray-200 py-2 text-3xl font-bold backdrop-blur-sm md:px-5 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FaQuoteRight className="text-primary text-2xl" />
            <span className="font-serif text-2xl font-bold">
              QUOTES_ND_NOTES
            </span>
          </div>
          <div className="flex items-center">
            <SearchBar />
          </div>
          <div className="border-primary bg-primary flex cursor-pointer items-center justify-center rounded-full border-2 p-2 text-[25px] text-white">
            <GoPerson className="text-md" />
          </div>
        </div>
      </nav>
    </>
  );
}
