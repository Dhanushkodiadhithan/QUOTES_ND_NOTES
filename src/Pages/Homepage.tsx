import { LuSparkles } from "react-icons/lu";
import { LuQuote } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { LuTag } from "react-icons/lu";
import HerosectionCard from "../Components/HerosectionCard";
export default function Homepage() {
  return (
    <>
      <div className=" h-[600px]  container mx-auto flex items-center justify-between  ">
        <div className="left  flex h-full w-1/2 flex-col justify-around gap-4  py-20 md:px-10">
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
        <div className="right  h-full w-1/2 ">
          <HerosectionCard /></div>
      </div>
    </>
  );
}
