import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

export default function HerosectionCard() {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-3/4 rounded-lg bg-white p-8 text-white border-2 border-gray-200 shadow-lg">
          <div className="mb-4 flex h-50 w-full items-center justify-center">
            <img src="./src/Asserts/Spiderman.webp" alt="Spiderman" />
          </div>
          <div className="mb-6 text-xl text-black font-bold">
            "When i was born, The devil said Ohh shit ! Competition !!."
          </div>
          <div className="flex justify-between text-gray-600">
        <div className="font-bold cursor-pointer">-- Steve Jobs</div>
            <div className="flex">
              <FaRegHeart className="text-lg cursor-pointer" />
              <FaShareAlt className="ml-4 text-lg cursor-pointer" />
            </div>
          </div>
            <div className="text-sm text-gray-400">Attitude</div>
        </div>
      </div>
    </>
  );
}
