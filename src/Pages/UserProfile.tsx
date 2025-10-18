import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { changeProfileTab } from "../Redux/Slices/Justslice";
import { useDispatch, useSelector } from "react-redux";
import {
  // IoSettingsOutline,
  IoCameraOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import Accountsetting from "../Components/Accountsetting";
import Mycontent from "../Components/Mycontent";

const tabs = [
  {
    key: "Account Settings",
    label: "Account Settings",
    icon: <GoPerson className="text-md" />,
  },
  {
    key: "My Content",
    label: "My Content",
    icon: <IoDocumentTextOutline className="text-md" />,
  },
];

export default function UserProfile() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const dispatch = useDispatch();
  const activeProfileTab = useSelector((state: any) => state.just.activeProfileTab);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileImg(url);
    }
  };

  return (
    <>
      <div className="bg-[#fafaf9] pt-16">
        <div className="flex h-[250px] items-center justify-center border-b border-gray-200">
          <div className="flex h-[200px] w-[1500px] py-4 lg:px-10 2xl:px-0">
            {/* Left side: Profile picture and user info */}
            <div className="flex h-full w-[50%] items-center">
              <div className="group relative h-[150px] w-[150px] overflow-hidden rounded-full bg-white shadow-lg">
                <img
                  src={
                    profileImg
                      ? profileImg
                      : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
                  }
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
                <label className="bg-opacity-40 absolute inset-0 flex cursor-pointer items-center justify-center bg-black opacity-0 transition-opacity group-hover:opacity-100">
                  <IoCameraOutline className="text-3xl text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="ml-10 flex flex-col text-black">
                <div className="text-2xl font-bold">Dhanushkodi adhithan</div>
                <div className="text-sm text-gray-400">dhanukodiexample@gmail.com</div>
                <div className="my-4 flex items-center gap-4">
                  {[
                    { count: 131, label: "Quotes" },
                    { count: 89, label: "Favorites" },
                    { count: 12, label: "Collections" },
                  ].map(({ count, label }) => (
                    <span key={label} className="flex flex-col items-center">
                      <span className="text-xl font-bold">{count}</span>
                      <span className="text-gray-400">{label}</span>
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-400">Member since March 2023</div>
              </div>
            </div>

            {/* Right side: Action buttons */}
            <div className="flex h-full w-[50%] items-start justify-end gap-4">
              {/* <button className="flex items-center rounded-md px-4 py-2 text-black hover:bg-[#f59e0b] hover:text-white">
                <IoSettingsOutline className="mr-2 text-xl" />
                Settings
              </button> */}
              <button className="bg-primary flex items-center rounded-md px-4 py-2 text-white">
                <MdOutlineFileUpload className="mr-2 text-xl" />
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center border-b border-gray-200">
          <div className="flex h-full w-[1500px] items-center xl:ps-10 2xl:px-0">
            <ul className="flex gap-10 text-gray-400">
              {tabs.map(({ key, label, icon }) => (
                <li
                  key={key}
                  className={`flex cursor-pointer items-center gap-2 border-b-2 py-2 transition-all duration-300 ease-in-out ${
                    activeProfileTab === key
                      ? "border-primary text-primary"
                      : "border-transparent hover:text-black"
                  }`}
                  onClick={() => dispatch(changeProfileTab(key))}
                >
                  {icon}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeProfileTab === "Account Settings" && <Accountsetting />}
      {activeProfileTab === "My Content" && <Mycontent />}
    </>
  );
}
