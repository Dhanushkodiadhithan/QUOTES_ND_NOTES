import React, { useState, useRef } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { ToggleShow } from "../Redux/Slices/Justslice";
const DEFAULT_IMAGE = "src/backend/uploads/Spiderman.webp";

const categories = ["Motivation", "Life", "Wisdom", "Success", "Happiness"];

export default function UploadQuotes() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(DEFAULT_IMAGE);
  const [category, setCategory] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : DEFAULT_IMAGE);
  };

  const handleCancel = () => {
    dispatch(ToggleShow());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category || !text || !author || !tags) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("category", category);
    formData.append("text", text);
    formData.append("author", author);
    formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim())));

    try {
      const response = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload");
      alert("Quote uploaded successfully");
      dispatch(ToggleShow());
      setImage(null);
      setPreview(DEFAULT_IMAGE);
      setCategory("");
      setText("");
      setAuthor("");
      setTags("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      alert("Error uploading quote");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Upload a new Quote</h2>
      <form onSubmit={handleSubmit}>
        {/* Image upload and preview */}
        <label className="mb-2 block font-medium">Upload Image</label>
        <div className="group relative mb-4 w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden cursor-pointer">
          <img src={preview} alt="Upload Preview" className="w-full h-full object-cover transition-all duration-200" />
          <label className="bg-opacity-40 absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <IoCameraOutline className="text-3xl text-white" />
            <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageChange} required />
          </label>
        </div>
        {/* Category */}
        <label className="mb-2 block font-medium">Category</label>
        <select className="mb-4 w-full rounded border border-gray-300 p-2" value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        {/* Quote text */}
        <label className="mb-2 block font-medium">Quote Text</label>
        <textarea className="mb-4 w-full rounded border border-gray-300 p-2" rows={3} placeholder="Enter Quote" value={text} onChange={e => setText(e.target.value)} required />
        {/* Author */}
        <label className="mb-2 block font-medium">Author</label>
        <input type="text" className="mb-4 w-full rounded border border-gray-300 p-2" placeholder="Author Name" value={author} onChange={e => setAuthor(e.target.value)} required />
        {/* Tags */}
        <label className="mb-2 block font-medium">Tags</label>
        <input type="text" className="mb-4 w-full rounded border border-gray-300 p-2" placeholder="Add Tags separated by commas" value={tags} onChange={e => setTags(e.target.value)} required />
        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">Upload Quote</button>
          <button type="button" className="w-full rounded bg-gray-400 py-2 text-white transition hover:bg-gray-600" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
