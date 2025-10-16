import { LuSparkles, LuQuote, LuTag } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Components/Card";
import HerosectionCard from "../Components/HerosectionCard";
import CategoryBar from "../Components/CategoryBar";
import Footer from "../Components/Footer";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setAllQuotes } from "../Redux/Slices/Feedslice";

interface Quote {
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
}

const statsData = [
  { icon: <LuQuote className="text-primary text-2xl" />, number: "1.2K+", label: "Daily Quotes" },
  { icon: <LuTag className="text-primary text-2xl" />, number: "8+", label: "Categories" },
  { icon: <FaRegHeart className="text-primary text-2xl" />, number: "127", label: "Favorites" },
];

export default function Homepage() {
  const loaderQuotes = useLoaderData() as Quote[];
  const reduxQuotes = useSelector((state: any) => state.feeds.allQuotes);
  const activeCategory = useSelector((state: any) => state.feeds.activeCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loaderQuotes?.length) {
      dispatch(setAllQuotes(loaderQuotes));
    }
  }, [loaderQuotes, dispatch]);

  const filteredQuotes = activeCategory === "All Quotes"
    ? reduxQuotes
    : reduxQuotes.filter((q: Quote) => q.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto mt-16 flex h-[600px] items-center justify-between">
        <div className="left flex h-full w-1/2 flex-col justify-around gap-4 py-20 md:px-10">
          <div className="text-primary flex items-center gap-2 text-sm font-bold">
            <LuSparkles /> Discover Daily Inspiration
          </div>
          <div className="text-6xl font-bold">Your Daily Dose of</div>
          <div className="text-primary text-6xl font-bold">Motivation</div>
          <div className="text-justify text-xl text-gray-400">
            Discover thousands of inspirational quotes from great minds across history. Find motivation, save favorites, and get inspired every day with our curated collection.
          </div>
          <div className="justify-center mt-5 flex items-center gap-10">
            {statsData.map(({ icon, number, label }) => (
              <span key={label} className="flex flex-col items-center gap-1">
                {icon}
                <br />
                <h1 className="text-2xl font-bold">{number}</h1>
                <span className="text-gray-400">{label}</span>
              </span>
            ))}
          </div>
        </div>
        {/* Hero Section Card */}
        <div className="right h-full w-1/2">
          <HerosectionCard />
        </div>
      </div>

      {/* Category Bar */}
      <CategoryBar />

      {/* Quotes Feed */}
      <div className="container mx-auto p-10">
        <div className="flex flex-col mb-4">
          <span className="text-3xl font-bold">Inspirational Quotes</span>{" "}
          <span className="text-lg text-gray-400">
            {filteredQuotes.length} quotes in {activeCategory} category
          </span>
        </div>

        {/* Feed Cards Grid */}
        <div className={`grid grid-cols-1 place-items-center gap-4 py-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 ${filteredQuotes.length === 0 ? "min-h-[300px]" : ""}`}>
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote: Quote) => <Card key={quote._id} quote={quote} />)
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No quotes available in this category.
            </div>
          )}
        </div>

        {/* End of Quotes Notice */}
        <div className="container mx-auto flex justify-center gap-3 text-center text-gray-400 mt-4">
          <FiCheckCircle className="text-xl" />
          You've reached the end of the quotes
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
