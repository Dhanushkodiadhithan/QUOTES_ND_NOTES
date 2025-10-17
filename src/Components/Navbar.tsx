import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { FaRegHeart, FaQuoteRight } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { CiSettings } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { PiSignOutFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeProfileTab, KeepUpload } from "../Redux/Slices/Justslice";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { clearUser } from "../Redux/Slices/authslice";

const dropdownItems = [
  {
    key: "myContent",
    icon: <IoDocumentTextOutline className="text-md" />,
    label: "My Content",
    onClickType: "profileTab",
    actionValue: "Account Settings",
  },
  {
    key: "myFavorites",
    icon: <FaRegHeart className="text-md" />,
    label: "My Favorites",
  },
  {
    key: "settings",
    icon: <CiSettings className="text-lg" />,
    label: "Settings",
  },
  {
    key: "help",
    icon: <IoIosHelpCircleOutline className="text-lg" />,
    label: "Help",
  },
  {
    key: "signOut",
    icon: <PiSignOutFill className="text-lg" />,
    label: "Sign Out",
  },
];

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Sign out failed", error);
      alert("Failed to sign out. Please try again."); // Optionally show error popup
    }
  };

  const handleDropdownClick = (item: typeof dropdownItems[number]) => {
    setShowDropdown(false); // Close dropdown immediately

    if (item.key === "signOut") {
      handleSignOut();
    } else if (item.onClickType === "profileTab" && item.actionValue) {
      dispatch(changeProfileTab(item.actionValue));
      dispatch(KeepUpload(false));
      navigate("/user-profile");
    }
    // Other click handlers can be implemented here
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b-2 border-gray-200 py-2 text-3xl font-bold backdrop-blur-sm md:px-5">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FaQuoteRight className="text-primary text-2xl" />
            <span
              className="cursor-pointer font-serif text-2xl font-bold"
              onClick={() => navigate("/home-page")}
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
                {dropdownItems.map((item) => (
                  <span
                    key={item.key}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from closing dropdown
                      handleDropdownClick(item)}}
                  >
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
