import { useState, useEffect } from "react";
import useUserProfile from "../hooks/useUserProfile";
import { getAuth } from "firebase/auth";

export default function Accountsetting() {
  const { profile, loading, refetch } = useUserProfile();
  const [form, setForm] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ✅ Load current profile into editable form
  useEffect(() => {
    if (profile) {
      setForm(profile);
      setPreviewUrl(
        profile.profilePic
          ? `http://localhost:5000/${profile.profilePic}`
          : "/src/backend/uploads/Spiderman.webp"
      );
    }
  }, [profile]);

  // ✅ Update input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle file input + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  // ✅ Submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return alert("Not logged in");

      const token = await currentUser.getIdToken();

      const formData = new FormData();
      const editableFields = ["name", "phoneNumber", "location", "website", "bio"];
      editableFields.forEach((field) => {
        if (form[field] !== undefined && form[field] !== null) {
          formData.append(field, form[field]);
        }
      });
      if (file) formData.append("profilePic", file);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl}/users/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.msg || "Update failed");

      alert("✅ Profile updated successfully!");
      setForm(updated);
      setFile(null);

      // ✅ Re-fetch to refresh UserProfile instantly
      if (refetch) await refetch();

      // ✅ Update preview (new image)
      if (updated.profilePic) {
        setPreviewUrl(`http://localhost:5000/${updated.profilePic}`);
      }
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form)
    return (
      <div className="flex items-center justify-center py-10 text-gray-500">
        Loading profile...
      </div>
    );

  return (
    <div className="my-10 flex w-full items-center justify-center py-5">
      <div className="flex w-[1000px] justify-center">
        <div className="w-[50%]">
          <p className="mb-3 text-xl font-bold">Personal Information</p>
          <div className="flex flex-col gap-5 border border-gray-200 p-5 rounded-md shadow-sm bg-white">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email || ""}
                  readOnly
                  className="w-full rounded border p-2 bg-gray-100"
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber || ""}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={form.website || ""}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <img
                  src={previewUrl || "/src/backend/uploads/Spiderman.webp"}
                  alt="Preview"
                  className="mt-2 h-20 w-20 rounded-full object-cover border"
                />
              </div>

              <div>
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className={`mt-4 w-full rounded-md py-2 text-white transition-all duration-300 ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
