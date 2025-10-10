import { useState } from "react";
import { MdOutlineShield } from "react-icons/md";
import { FiKey } from "react-icons/fi";
export default function Accountsetting() {
  const [bio, setBio] = useState<string>("");

  return (
    <>
    {/* Account Settings Section */}
      <div className="w-100% my-10 flex items-center justify-center py-5">
        <div className="flex w-[1000px] gap-10">
          <div className="w-[50%]">
            <p className="mb-3 text-xl font-bold">Personal Information</p>
            <div className="flex flex-col gap-5 border border-gray-200 p-5">
              <form action="#">
              <div>
                <label className="cursor-pointer" htmlFor="name">
                  Full Name <span className="text-md text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  value="DhanushKodi adhithan"
                  id="name"
                  required
                  className="focus:outline-primary w-full p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="cursor-pointer" htmlFor="email">
                  Email Address <span className="text-md text-red-600">*</span>
                </label>
                <br />
                <input
                  type="email"
                  value="example@gmail.com"
                  id="email"
                  required
                  className="focus:outline-primary w-full p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="cursor-pointer" htmlFor="phno">
                  Phone Number
                </label>
                <br />
                <input
                  type="tel"
                  value="+91 9876543210"
                  id="phno"
                  className="focus:outline-primary w-full p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="cursor-pointer" htmlFor="location">
                  Location
                </label>
                <br />
                <input
                  type="text"
                  value="Chennai, India"
                  id="location"
                  className="focus:outline-primary w-full p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="cursor-pointer" htmlFor="Website">
                  Website
                </label>
                <br />
                <input
                  type="text"
                  value="https://example.com"
                  id="Website"
                  className="focus:outline-primary w-full p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="cursor-pointer" htmlFor="bio">
                  Bio
                </label>
                <br />
                <textarea
                  id="bio"
                  value={bio}
                  className="focus:outline-primary w-full rounded-md border border-gray-300 p-2"
                  rows={4}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                  placeholder="Tell us about yourself..."
                  readOnly
                ></textarea>
                <p className="text-sm text-gray-400">
                  {bio.length}/500 characters
                </p>
              </div>
              <button className="bg-primary mt-4 w-full rounded-md py-2 text-white">
                Save Changes
              </button>
              </form>
            </div>
          </div>
          <div className="flex w-[50%] flex-col gap-10">
            <div>
              <p className="mb-3 text-xl font-bold">Security</p>
              <div className="flex flex-col items-center justify-center gap-5 border border-gray-200 p-5 text-center">
                <MdOutlineShield className="text-6xl text-gray-400" />
                <p className="text-gray-400">
                  Keep your account secure with a strong <br />
                  password
                </p>
                <button className="flex items-center gap-3 rounded-md px-4 py-2 text-black hover:bg-[#f59e0b] hover:text-white">
                  <FiKey />
                  Change Password
                </button>
              </div>
            </div>
            <div>
              <p className="text-xl font-bold mb-5">Notifications</p>
              <div className="gap-5 flex flex-col border border-gray-200 p-5">
                <div>
                  <input type="checkbox" className="border-primary border" />
                  <span className="ml-2 text-sm">Email Notifications</span>
                  <p className="ml-6 text-sm text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <div>
                  <input type="checkbox" className="border-primary border" />
                  <span className="ml-2 text-sm">Push Notifications</span>
                  <p className="ml-6 text-sm text-gray-400">
                    Get notified on your device
                  </p>
                </div>
                <div>
                  <input type="checkbox" className="border-primary border" />
                  <span className="ml-2 text-sm">Weekly Digest</span>
                  <p className="ml-6 text-sm text-gray-400">
                    Summary of your activity
                  </p>
                </div>
                <div>
                  <input type="checkbox" className="border-primary border" />
                  <span className="ml-2 text-sm">New Followers</span>
                  <p className="ml-6 text-sm text-gray-400">
                    When someone follows you
                  </p>
                </div>
                <div>
                  <input type="checkbox" className="border-primary border" />
                  <span className="ml-2 text-sm">Content Likes</span>
                  <p className="ml-6 text-sm text-gray-400">
                    When someone likes your content
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
