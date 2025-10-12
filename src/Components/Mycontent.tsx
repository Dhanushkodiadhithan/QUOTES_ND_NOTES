import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuQuote } from "react-icons/lu";
import Card from "./Card";
import { MdDeleteOutline } from "react-icons/md";
import UploadQuote from "./UploadQuotes";
import { useSelector, useDispatch } from "react-redux";
import { ToggleShow } from "../Redux/Slices/Justslice";
import { useLoaderData } from "react-router-dom";

const tabs = [
  { label: "All Content", count: 6 },
  { label: "Shared Quotes", count: 3 },
  { label: "Favorites", count: 2 },
];

// Define quote type for strong typing
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
  postedBy?: string;
}

export default function Mycontent() {
  const showUploadQuote = useSelector((state: any) => state.just.showUploadQuote);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>("All Content");
  const [quotedelete, setQuoteDelete] = useState<boolean>(false);

  const quotes = useLoaderData() as Quote[];

  // Filter quotes posted by 'user1'
  const user1Quotes = quotes.filter((quote) => quote.postedBy === "admin");

  return (
    <>
      <div className="flex justify-center p-10">
        <div className="w-[1500px]">
          <p className="text-2xl font-bold">Content Statistics</p>
          <div className="my-8 flex gap-10">
            <div className="w-[300px] rounded-lg border border-gray-200 p-5">
              <p className="text-gray-400">Shared Quotes</p>
              <p className="flex justify-between">
                <span className="text-2xl font-bold">108</span>
                <LuQuote className="text-2xl text-[#8b5cf6]" />
              </p>
              <p className="text-sm text-[#27bb81]">+30 this month</p>
            </div>
            <div className="w-[300px] rounded-lg border border-gray-200 p-5">
              <p className="text-gray-400">Total View</p>
              <p className="flex justify-between">
                <span className="text-2xl font-bold">2,847</span>
                <MdOutlineRemoveRedEye className="text-2xl text-[#f59e0b]" />
              </p>
              <p className="text-sm text-[#27bb81]">+892 this month</p>
            </div>
            <div className="w-[300px] rounded-lg border border-gray-200 p-5">
              <p className="text-gray-400">Total Likes</p>
              <p className="flex justify-between">
                <span className="text-2xl font-bold">456</span>
                <FaRegHeart className="text-2xl text-[#ef4444]" />
              </p>
              <p className="text-sm text-[#27bb81]">+127 this month</p>
            </div>
          </div>
          <div className="w-full">
            <h2 className="mb-6 text-2xl font-bold">My Content</h2>
            {/* Tabs */}
            <div className="mb-8 flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  className={`rounded-full px-4 py-2 font-medium transition-all duration-300 ${
                    activeTab === tab.label
                      ? "bg-primary text-white"
                      : "hover:bg-primary bg-gray-100 text-gray-600 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  {tab.label} <span className="ml-2">{tab.count}</span>
                </button>
              ))}
              <button
                className="ml-auto flex items-center gap-1 rounded-md bg-red-500 px-4 py-2 text-white"
                onClick={() => setQuoteDelete(!quotedelete)}
              >
                <MdDeleteOutline className="text-lg" /> Delete
              </button>
              <button
                className="bg-primary flex items-center gap-2 rounded-md px-4 py-2 text-white"
                onClick={() => dispatch(ToggleShow())}
              >
                + Create New
              </button>
            </div>
            {/* Cards Grid */}
            <div
              className={`grid grid-cols-3 gap-6 ${
                showUploadQuote ? "grid-cols-1" : ""
              }`}
            >
              {showUploadQuote ? (
                <UploadQuote />
              ) : (
                <>
                  {user1Quotes.map((quote) => (
                    <Card key={quote._id} quote={quote} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
