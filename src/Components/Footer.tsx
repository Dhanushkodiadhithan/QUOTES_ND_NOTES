import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
export default function Footer() {
  return (
    <>
      {/* Footer Component */}
      <p className="text-center text-[30px] font-bold text-black">
        Quick Actions
      </p>
      <p className="text-center text-gray-400">
        Access your most-used features quickly and efficiently
      </p>
      <div className="mt-4 flex items-center justify-center gap-7 mt-10 mb-[100px]">
        <span className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-10 py-4 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-[-5px] ease-out cursor-pointer">
          <span className="flex h-16 w-16 items-center justify-center text-[25px] rounded-full bg-[#6366f1] text-white">
           <IoSearch />
          </span>
          <p className="text-lg font-bold text-black">Search Content</p>
          <p className="text-gray-400">Find quotes favorite quickly</p>
        </span>
        <span className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-10 py-4 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-[-5px] ease-out cursor-pointer">
          <span className="flex h-16 w-16 items-center justify-center text-[25px] rounded-full bg-[#10b981] text-white">
           <FiUpload />
          </span>
          <p className="text-lg font-bold text-black">Upload Content</p>
          <p className="text-gray-400">Share your favorite quotes</p>
        </span>
        <span className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-10 py-4 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-[-5px] ease-out cursor-pointer">
          <span className="flex h-16 w-16 items-center justify-center text-[25px] rounded-full bg-[#8b5cf6] text-white">
           <GoPerson />
          </span>
          <p className="text-lg font-bold text-black">My Profile</p>
          <p className="text-gray-400">View your saved content</p>
        </span>
        <span className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-10 py-4 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-[-5px] ease-out cursor-pointer">
          <span className="flex h-16 w-16 items-center justify-center text-[25px] rounded-full bg-[#ef4444] text-white">
           <FaRegHeart />
          </span>
          <p className="text-lg font-bold text-black">Favorites</p>
          <p className="text-gray-400">Access your saved items</p>
        </span>
      </div>
      <div className="mt-10 border-t border-gray-200 py-10">
        <p className="text-center text-gray-400 ">
          © 2025 QUOTES_ND_NOTES. All rights reserved.
          <br />
          Discover inspiration and wisdom through carefully curated quotes every day.
        </p>
      </div>
    </>
  );
}
