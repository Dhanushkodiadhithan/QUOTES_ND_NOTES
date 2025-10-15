import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeProfileTab, KeepUpload } from "../Redux/Slices/Justslice";

// Define the action icons and handlers in one place
const actions = [
  {
    key: "search",
    icon: <IoSearch />,
    bg: "bg-[#6366f1]",
    title: "Search Content",
    subtitle: "Find quotes favorite quickly",
    onClick: (navigate: (path: string) => void) => {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when navigating to homepage
    },
  },
  {
    key: "upload",
    icon: <FiUpload />,
    bg: "bg-[#10b981]",
    title: "Upload Content",
    subtitle: "Share your favorite quotes",
    onClick: (navigate: (path: string) => void, dispatch: any) => {
      dispatch(changeProfileTab("My Content"));
      dispatch(KeepUpload(true));
      navigate("/user-profile");
    },
  },
  {
    key: "profile",
    icon: <GoPerson />,
    bg: "bg-[#8b5cf6]",
    title: "My Profile",
    subtitle: "View your saved content",
    onClick: (navigate: (path: string) => void, dispatch: any) => {
      dispatch(changeProfileTab("Account Settings"));
      navigate("/user-profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  {
    key: "favorites",
    icon: <FaRegHeart />,
    bg: "bg-[#ef4444]",
    title: "Favorites",
    subtitle: "Access your saved items",
    onClick: () => {},
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {/* Footer Component */}
      <p className="text-center text-[30px] font-bold text-black">
        Quick Actions
      </p>
      <p className="text-center text-gray-400">
        Access your most-used features quickly and efficiently
      </p>
      <div className="mt-4 mt-10 mb-[100px] flex items-center justify-center gap-7">
        {actions.map((action) => (
          <span
            key={action.key}
            className="flex transform cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-10 py-4 shadow-md transition-shadow duration-300 ease-out hover:translate-y-[-5px] hover:shadow-lg"
            onClick={() => action.onClick(navigate, dispatch)}
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full text-[25px] ${action.bg} text-white`}
            >
              {action.icon}
            </span>
            <p className="text-lg font-bold text-black">{action.title}</p>
            <p className="text-gray-400">{action.subtitle}</p>
          </span>
        ))}
      </div>
      <div className="mt-10 border-t border-gray-200 py-10">
        <p className="text-center text-gray-400">
          © 2025 QUOTES_ND_NOTES. All rights reserved.
          <br />
          Discover inspiration and wisdom through carefully curated quotes every
          day.
        </p>
      </div>
    </>
  );
}
