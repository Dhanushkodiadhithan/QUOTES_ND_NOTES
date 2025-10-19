// import { MdOutlineFileUpload } from "react-icons/md";
import { changeProfileTab } from "../Redux/Slices/Justslice";
import { useDispatch, useSelector } from "react-redux";
import { GoPerson } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
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
  const dispatch = useDispatch();
  const activeProfileTab = useSelector(
    (state: any) => state.just.activeProfileTab,
  );


  
  // function formatMemberSince(dateString: string | undefined): string {
  //   if (!dateString) return "";

  //   const memberDate = new Date(dateString);
  //   const now = new Date();

  //   const diffTime = now.getTime() - memberDate.getTime();
  //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays === 0) {
  //     return "today";
  //   } else if (diffDays === 1) {
  //     return "yesterday";
  //   } else {
  //     return memberDate.toISOString().slice(0, 10);
  //   }
  // }


  return (
    <>
      <div className="bg-[#fafaf9] pt-16">
        <div className="flex py-10 items-center justify-center border-b border-gray-200">
          <div className="flex h-[200px] w-[1500px] py-4 lg:px-10 2xl:px-0">
            {/* Left side: Profile picture and user info */}
            <div className="flex h-full w-[70%] items-center">
              <div className="group relative h-[150px] w-[150px] overflow-hidden rounded-full bg-white shadow-lg border-4 border-white">
                <img
                  src= "src/backend/uploads/Spiderman.webp"
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="ml-10 flex flex-col text-black">
                <div className="text-2xl font-bold">Dhanush</div>
                <div className="text-sm text-gray-400">dhanushkodi@gmail.com</div>
                <div className="my-4 flex items-center gap-4">
                  {[
                    { count: 11, label: "Quotes" },
                    { count: 11, label: "Favorites" },
                    { count: 11, label: "Saved" },
                  ].map(({ count, label }) => (
                    <span key={label} className="flex flex-col items-center">
                      <span className="text-xl font-bold">{count}</span>
                      <span className="text-gray-400">{label}</span>
                    </span>
                  ))}
                </div>
                <div className="mb-2 max-w-lg text-gray-600">
                  Its my first website which i have created using React and
                  Firebase. I love to share quotes and notes with everyone.
                </div>
                
                <div className="text-sm text-gray-400">
                  Member since January 1, 2023
                </div>
              </div>
            </div>

            {/* Right side: Action buttons */}
            {/* <div className="flex h-full w-[50%] items-start justify-end gap-4">
              <button className="bg-primary flex items-center rounded-md px-4 py-2 text-white">
                <MdOutlineFileUpload className="mr-2 text-xl" />
                Share Profile
              </button>
            </div> */}
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
