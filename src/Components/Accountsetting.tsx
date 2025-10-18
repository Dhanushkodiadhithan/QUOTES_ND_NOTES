import { useState } from "react";
import { MdOutlineShield } from "react-icons/md";
import { FiKey } from "react-icons/fi";

export default function Accountsetting() {
  // Declare bio state to hold textarea input value
  const [bio, setBio] = useState<string>("");

  // Group personal info fields for mapping
  const personalInfoFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      value: "DhanushKodi adhithan",
      required: true,
      readOnly: true,
      showAsterisk: true,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      value: "example@gmail.com",
      required: true,
      readOnly: true,
      showAsterisk: true,
    },
    {
      id: "phno",
      label: "Phone Number",
      type: "tel",
      value: "+91 9876543210",
      readOnly: true,
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      value: "Chennai, India",
      readOnly: true,
    },
    {
      id: "Website",
      label: "Website",
      type: "text",
      value: "https://example.com",
      readOnly: true,
    },
  ];

  // Group notification options for mapping
  // const notifications = [
  //   {
  //     id: "emailNotifications",
  //     label: "Email Notifications",
  //     description: "Receive updates via email",
  //   },
  //   {
  //     id: "pushNotifications",
  //     label: "Push Notifications",
  //     description: "Get notified on your device",
  //   },
  //   {
  //     id: "weeklyDigest",
  //     label: "Weekly Digest",
  //     description: "Summary of your activity",
  //   },
  //   {
  //     id: "newFollowers",
  //     label: "New Followers",
  //     description: "When someone follows you",
  //   },
  //   {
  //     id: "contentLikes",
  //     label: "Content Likes",
  //     description: "When someone likes your content",
  //   },
  // ];

  return (
    <>
      {/* Account Settings Section Wrapper */}
      <div className="w-100% my-10 flex items-center justify-center py-5">
        <div className="flex w-[1000px] gap-10">
          {/* Left Section: Personal Information */}
          <div className="w-[50%]">
            <p className="mb-3 text-xl font-bold">Personal Information</p>
            <div className="flex flex-col gap-5 border border-gray-200 p-5">
              <form action="#">
                {/* Map personal info fields to generate inputs */}
                {personalInfoFields.map(
                  ({
                    id,
                    label,
                    type,
                    value,
                    readOnly,
                    required,
                    showAsterisk,
                  }) => (
                    <div key={id}>
                      <label className="cursor-pointer" htmlFor={id}>
                        {label}{" "}
                        {showAsterisk && (
                          <span className="text-md text-red-600">*</span>
                        )}
                      </label>
                      <br />
                      <input
                        type={type}
                        value={value}
                        id={id}
                        required={required}
                        className="focus:outline-primary w-full p-2"
                        readOnly={readOnly}
                      />
                    </div>
                  ),
                )}

                {/* Bio Textarea separately because it uses state for value */}
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

          {/* Right Section: Security and Notifications */}
          <div className="flex w-[50%] flex-col gap-10">
            {/* Security Box */}
            <div>
              <p className="mb-3 text-xl font-bold">Security</p>
              <div className="flex flex-col items-center justify-center gap-5 border border-gray-200 p-5 text-center">
                <MdOutlineShield className="text-6xl text-gray-400" />
                <p className="text-gray-400">
                  Keep your account secure with a strong <br /> password
                </p>
                <button className="flex items-center gap-3 rounded-md px-4 py-2 text-black hover:bg-[#f59e0b] hover:text-white">
                  <FiKey />
                  Change Password
                </button>
              </div>
            </div>

            {/* Notifications */}
            {/* <div>
              <p className="text-xl font-bold mb-5">Notifications</p>
              <div className="gap-5 flex flex-col border border-gray-200 p-5">
                {notifications.map(({ id, label, description }) => (
                  <div key={id}>
                    <input type="checkbox" className="border-primary border" id={id} />
                    <label htmlFor={id} className="ml-2 text-sm">
                      {label}
                    </label>
                    <p className="ml-6 text-sm text-gray-400">{description}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
