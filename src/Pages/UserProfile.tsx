import { MdOutlineFileUpload } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
export default function UserProfile() {
  return (
    <>
      <div className="bg-[#fafaf9] py-16">
        <div className="flex h-[250px] items-center justify-center">
          <div className="flex h-[200px] w-[1500px] py-4 lg:px-10 2xl:px-0 border-b border-gray-200 ">
            <div className="flex h-full w-[50%] ">
              <div className="h-[150px] w-[150px] rounded-full bg-white shadow-lg"></div>
              <div className="ml-10 text-black flex flex-col">
                <div className="text-2xl font-bold">Dhanushkodi adhithan</div>
                <div className="text-sm text-gray-400">dhanukodiexample@gmail.com</div>
                <div className="my-4 flex items-center gap-4">
                  <span className="flex flex-col items-center">
                    <span className="text-xl font-bold">{131}</span>
                    <span className="text-gray-400">Quotes</span>
                  </span>
                  <span className="flex flex-col items-center">
                    <span className="text-xl font-bold">{89}</span>
                    <span className="text-gray-400">Favorites</span>
                  </span><span className="flex flex-col items-center">
                    <span className="text-xl font-bold">{12}</span>
                    <span className="text-gray-400">Collections</span>
                  </span>
                </div>
                <div className="text-sm text-gray-400">Member since March 2023</div>
              </div>
            </div>
            <div className="flex h-full w-[50%] items-start justify-end gap-4">
              <button className="flex items-center rounded-md px-4 py-2 text-black hover:bg-[#f59e0b] hover:text-white">
                <IoSettingsOutline className="mr-2 text-xl" />
                Settings
              </button>
              <button className="bg-primary flex items-center rounded-md px-4 py-2 text-white">
                <MdOutlineFileUpload className="mr-2 text-xl" />
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
