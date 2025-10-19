// import { MdOutlineShield } from "react-icons/md";
// import { FiKey } from "react-icons/fi";

export default function Accountsetting() {


  return (
    <div className="my-10 flex w-full items-center justify-center py-5">
      <div className="flex w-[1000px] justify-center ">
        {/* Left Section: Personal Information */}
        <div className="w-[50%]">
          <p className="mb-3 text-xl font-bold">Personal Information</p>
          <div className="flex flex-col gap-5 border border-gray-200 p-5">
            <form >
              {/* Full Name */}
              <div>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value="dhanush"
                  className="w-full rounded border p-2"
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded border p-2"
                  value="dhaushkodi@gmail.com"
                  disabled // Email usually not editable
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value="9876543210"
                  readOnly
                  className="w-full rounded border p-2"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value="india"
                  readOnly
                  name="location"
                  className="w-full rounded border p-2"
                />
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  value="ww.example.com"
                  readOnly
                  name="website"
                  className="w-full rounded border p-2"
                />
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="w-full p-2"
                />
                
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  className="w-full rounded border p-2"
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about yourself..."
                />
                <p className="text-sm text-gray-400">
                </p>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Right Section: Security */}
        {/* <div className="flex w-[50%] flex-col gap-10">
          <div>
            <p className="mb-3 text-xl font-bold">Security</p>
            <div className="flex flex-col items-center justify-center gap-5 border border-gray-200 p-5 text-center">
              <MdOutlineShield className="text-6xl text-gray-400" />
              <p className="text-gray-400">
                Keep your account secure with a strong <br /> password
              </p>
              <button className="flex items-center gap-3 rounded-md px-4 py-2 text-black hover:bg-[#f59e0b] hover:text-white">
                <FiKey /> Change Password
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
