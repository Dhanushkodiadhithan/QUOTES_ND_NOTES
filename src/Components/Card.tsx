import { CiHeart } from "react-icons/ci";
import { GoShareAndroid } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
export default function Card() {
  return (
    <>
      <div className="my-5 h-[520px] w-[400px] overflow-hidden rounded-2xl shadow-lg">
        <div className="h-[250px] overflow-hidden">
          <img
            src="./src/Asserts/Spiderman.webp"
            alt="Spiderman"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="h-full w-full p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-primary border-gray rounded-full border-2 px-2 py-1 text-sm">
              Motivation
            </span>
            <span className="px-2 py-1 text-sm text-gray-400">2 hours ago</span>
          </div>
          <div className="mb-3 text-lg">
            "The only way to do great work is to love what you do."
          </div>
          <div className="mb-2 text-gray-600">-- Steve Jobs</div>
          <div className="text-sm text-gray-400 gap-2 flex flex-wrap border-b-2 border-gray-200 pb-2">
            <span className="bg-gray-50 px-2 py-1 text-sm"># attitude</span>
            <span className="px-2 py-1 text-sm  bg-gray-50"># strength</span>
          </div>
          <div className="flex items-center justify-between pt-5 text-gray-600">
            <div className="flex items-center  gap-3">
              <span className="flex gap-1"><CiHeart className="text-2xl"/>{123}</span>
              <span className="flex gap-1"><GoShareAndroid className="text-lg"/>Share</span>
            </div>
            <div ><FaRegBookmark  /></div>
          </div>
        </div>
      </div>
    </>
  );
}
