import { LuSparkles, LuQuote, LuTag } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import Card from "../Components/Card";
import HerosectionCard from "../Components/HerosectionCard";
import CategoryBar from "../Components/CategoryBar";
import Footer from "../Components/Footer";
import { useLoaderData } from "react-router-dom";


export default function Homepage() {
  const quotes = useLoaderData() as Array<{
    _id: string;
  text: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  likes: number;
  likedBy?: string[];
  shares?: number;
  sharedBy?: string[];
  savedBy?: string[];
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
  }>;
const feeds = useSelector((state: any) => state.feeds.activeCategory);
const filteredQuotes = feeds === "All Quotes" ? quotes : quotes.filter(quote => quote.category === feeds);
const activeCategory = useSelector((state: any) => state.feeds.activeCategory); 
return (
    <>
      {/* Hero Section Content*/}
      <div className="container mx-auto mt-16 flex h-[600px] items-center justify-between">
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
        {/* HerosectionCard */}
        <div className="right h-full w-1/2">
          <HerosectionCard />
        </div>
      </div>
      {/* Category Bar */}
      <CategoryBar />
      {/* Feed Section */}
      <div className="container mx-auto p-10">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Inspirational Quotes</span>{" "}
          <span className="text-lg text-gray-400">
            {filteredQuotes.length} quotes in {activeCategory} category
          </span>
        </div>
        {/* FeedCards Section */}
        <div>
          <div className={`grid grid-cols-1 place-items-center gap-4 py-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 ${filteredQuotes.length === 0 ? "min-h-[300px]" : ""}`}>
            {filteredQuotes.map((quote) => (
              <Card key={quote._id} quote={quote} />
            ))}
            {filteredQuotes.length === 0 && (
              <div className="col-span-full text-center text-gray-400">
                No quotes available in this category.
              </div>
            )}
          </div>
          
          <div className="container mx-auto flex justify-center gap-3 text-center text-gray-400">
            <FiCheckCircle className="text-xl" />
            You've reached the end of the quotes
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </>
  );
}
