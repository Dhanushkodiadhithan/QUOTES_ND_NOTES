import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { FaRegHeart, FaQuoteRight } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { CiSettings } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { PiSignOutFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b-2 border-gray-200 py-2 text-3xl font-bold backdrop-blur-sm md:px-5">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FaQuoteRight className="text-primary text-2xl" />
            <span
              className="cursor-pointer font-serif text-2xl font-bold"
              onClick={() => navigate("/")}
            >
              QUOTES_ND_NOTES
            </span>
          </div>
          <div className="flex items-center">
            <SearchBar />
          </div>
          <div
            className="border-primary bg-primary relative flex cursor-pointer items-center justify-center rounded-full border-2 p-2 text-[25px] text-white"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <GoPerson />
            {showDropdown && (
              <div className="absolute top-[50px] right-[10px] z-[100] w-[150px] rounded-lg border-2 border-gray-200 bg-white p-2 text-sm text-gray-600 shadow-2xl">
                <span
                  className="flex items-center gap-2 p-2 hover:bg-gray-100"
                  onClick={() => navigate("/user-profile")}
                >
                  <IoDocumentTextOutline className="text-md" /> My Content
                </span>
                <span className="flex items-center gap-2 p-2 hover:bg-gray-100">
                  <FaRegHeart className="text-md" /> My Favorites
                </span>
                <span className="flex items-center gap-2 p-2 hover:bg-gray-100">
                  <CiSettings className="text-lg" /> Settings
                </span>
                <span className="flex items-center gap-2 p-2 hover:bg-gray-100">
                  <IoIosHelpCircleOutline className="text-lg" /> Help
                </span>
                <span className="flex items-center gap-2 p-2 hover:bg-gray-100">
                  <PiSignOutFill className="text-lg" /> Sign Out
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
