import { CiBookmark } from "react-icons/ci";
import { IoCompassOutline } from "react-icons/io5";
import { RiEmotionHappyLine } from "react-icons/ri";
import { LiaWineGlassSolid } from "react-icons/lia";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuQuote } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

export default function CategoryBar() {
  return (
    <>
      {/* Category Bar */}
      {/* This bar is sticky and will always be visible at the top of the page */}
      <div className=" sticky top-16 z-30 h-[70px] w-full bg-white shadow-md">
        <div className="container mx-auto flex h-full items-center justify-between px-10">
          <span className="text-2xl font-bold text-white transition-transform hover:scale-105 hover:text-black">
            <span className="bg-primary flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2">
              <LuQuote className="text-lg" />
              <span className="text-sm">
                All Quotes <span className="ps-2">{1240}</span>
              </span>
            </span>
          </span>
          <span className="text-2xl font-bold text-gray-400 transition-transform hover:scale-105 hover:text-black">
            <span className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-2">
              <AiOutlineThunderbolt className="text-lg" />
              <span className="text-sm">
                Motivation <span className="ps-2">{312}</span>
              </span>
            </span>
          </span>
          <span className="text-2xl font-bold text-gray-400 transition-transform hover:scale-105 hover:text-black">
            <span className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-2">
              <FaRegHeart className="text-lg" />
              <span className="text-sm">
                Love <span className="ps-2">{185}</span>
              </span>
            </span>
          </span>
          <span className="text-2xl font-bold text-gray-400 transition-transform hover:scale-105 hover:text-black">
            <span className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-2">
              <LiaWineGlassSolid className="text-lg" />
              <span className="text-sm">
                Success <span className="ps-2">{240}</span>
              </span>
            </span>
          </span>
          <span className="text-2xl font-bold text-gray-400 transition-transform hover:scale-105 hover:text-black">
            <span className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-2">
              <IoCompassOutline className="text-lg" />
              <span className="text-sm">
                Life <span className="ps-2">{298}</span>
              </span>
            </span>
          </span>
          <span className="text-2xl font-bold text-gray-400 transition-transform hover:scale-105 hover:text-black">
            <span className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-2">
              <RiEmotionHappyLine className="text-lg" />
              <span className="text-sm">
                Happiness <span className="ps-2">{156}</span>
              </span>
            </span>
          </span>
          <span className="text-2xl font-bold text-gray-400 transition-transform hover:scale-105 hover:text-black">
            <span className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-2">
              <CiBookmark className="text-lg" />
              <span className="text-sm">
                Favorites <span className="ps-2">{127}</span>
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
