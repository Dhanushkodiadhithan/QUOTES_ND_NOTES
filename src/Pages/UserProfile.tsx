import { useEffect, useState } from "react";
import { changeProfileTab } from "../Redux/Slices/Justslice";
import { useDispatch, useSelector } from "react-redux";
import { GoPerson } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import Accountsetting from "../Components/Accountsetting";
const AccountsettingAny = Accountsetting as any;
import Mycontent from "../Components/Mycontent";
import { getAuth } from "firebase/auth";

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
  const activeProfileTab = useSelector((state: any) => state.just.activeProfileTab);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile using fetch (no Axios)
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.warn("⚠️ No logged-in user found");
        setProfile(null);
        setLoading(false);
        return;
      }

      const token = await currentUser.getIdToken();

      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Profile fetch failed: ${res.status} - ${errText}`);
      }

      const data = await res.json();
      console.log("✅ Profile data loaded:", data);
      setProfile(data);
    } catch (err) {
      console.error("❌ Error loading profile:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ This ensures UI auto-refreshes after saving in Accountsetting
  const handleProfileUpdated = async () => {
    await fetchProfile();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No profile data found.
      </div>
    );

  return (
    <>
      <div className="bg-[#fafaf9] pt-16">
        <div className="flex py-10 items-center justify-center border-b border-gray-200">
          <div className="flex h-[200px] w-[1500px] py-4 lg:px-10 2xl:px-0">
            {/* Left side: Profile picture and user info */}
            <div className="flex h-full w-[70%] items-center">
              <div className="group relative h-[150px] w-[150px] overflow-hidden rounded-full bg-white shadow-lg border-4 border-white">
                <img
                  src={
                    profile.profilePic
                      ? `http://localhost:5000/${profile.profilePic}`
                      : "src/backend/uploads/Spiderman.webp"
                  }
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="ml-10 flex flex-col text-black">
                <div className="text-2xl font-bold">
                  {profile.name || "Anonymous"}
                </div>
                <div className="text-sm text-gray-400">{profile.email || ""}</div>
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
                  {profile.bio || "No bio yet."}
                </div>
                <div className="text-sm text-gray-400">
                  Member since{" "}
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "January 1, 2023"}
                </div>
              </div>
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

      {/* Tab Content */}
        <AccountsettingAny onProfileUpdated={handleProfileUpdated} />
    
      {activeProfileTab === "My Content" && <Mycontent />}
    </>
  );
}
