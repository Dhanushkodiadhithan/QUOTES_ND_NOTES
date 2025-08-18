import { CiBookmark } from "react-icons/ci";
import { IoCompassOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { LuQuote } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { RiEmotionHappyLine } from "react-icons/ri";
import { LuTag } from "react-icons/lu";
import { LiaWineGlassSolid } from "react-icons/lia";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Card from "../Components/Card";
import HerosectionCard from "../Components/HerosectionCard";
export default function Homepage() {
  return (
    <>
      <div className="container mx-auto flex h-[600px] items-center justify-between">
        <div className="left flex h-full w-1/2 flex-col justify-around gap-4 py-20 md:px-10">
          <div className="text-primary flex items-center gap-2 text-sm font-bold">
            <LuSparkles /> Discover Daily Inspiration
          </div>
          <div className="text-6xl font-bold">Your Daily Dose of</div>
          <div className="text-primary text-6xl font-bold">Motivation</div>
          <div className="text-justify text-xl text-gray-400">
            Discover thousands of inspirational quotes from great minds across
            history. Find motivation, save favorites, and get inspired every day
            with our curated collection.
          </div>
          <div className="justify-cen mt-5 flex items-center gap-10">
            <span className="flex flex-col items-center gap-1">
              <LuQuote className="text-primary text-2xl" />
              <br />
              <h1 className="text-2xl font-bold">1.2K+</h1>
              <span className="text-gray-400"> Daily Quotes</span>
            </span>
            <span className="flex flex-col items-center gap-1">
              <LuTag className="text-primary text-2xl" />
              <br />
              <h1 className="text-2xl font-bold">8+</h1>
              <span className="text-gray-400"> Categories</span>
            </span>
            <span className="flex flex-col items-center gap-1">
              <FaRegHeart className="text-primary text-2xl" />
              <br />
              <h1 className="text-2xl font-bold">127</h1>
              <span className="text-gray-400"> Favorites</span>
            </span>
          </div>
        </div>
        <div className="right h-full w-1/2">
          <HerosectionCard />
        </div>
      </div>
      <div className="h-[70px] w-full shadow-md">
        <div className="container mx-auto flex h-full w-[1500px] items-center justify-between px-10">
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
      <div className="container mx-auto h-[600px] p-10">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Inspirational Quotes</span>{" "}
          <span className="text-lg text-gray-400">
            {10} quotes in all categories
          </span>
        </div>
        <div>
          <div className="grid grid-cols-1 place-items-center gap-4 py-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Card key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
