import { FaRegHeart } from "react-icons/fa";
import { LuQuote } from "react-icons/lu";
export default function HerosectionCard() {
  return (
    <>
      {/* Hero Section Card */}
      <div className="flex h-full w-full items-center justify-center">
        <div className=" relative w-3/4 rounded-lg border-2 border-gray-200 bg-white p-8 text-white shadow-lg transition-all duration-500 hover:scale-105">
          <div className=" mb-4 flex h-50 w-full items-center justify-center">
            <img src="src\backend\uploads\Spiderman.webp" alt="Spiderman" />
          </div>
          <div className="mb-6 text-xl font-bold text-black">
            "When i was born, The devil said Ohh shit ! Competition !!."
          </div>
          <div className="flex justify-between text-gray-600">
            <div className="cursor-pointer font-bold">-- Steve Jobs</div>
            <div className="flex">
              <FaRegHeart className="cursor-pointer text-lg" />
            </div>
          </div>
          <div className="text-sm text-gray-400">Attitude</div>
          <span className="bg-primary absolute top-[-20px] left-[-20px] rounded-full p-3 text-xl text-white">
            <LuQuote />
          </span>
        </div>
      </div>
    </>
  );
}
