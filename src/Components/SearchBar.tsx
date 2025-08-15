import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <>
      <span className="relative w-[500px]">
        <input
          type="text"
          placeholder="Search quotes"
          className="placeholder:text-md focus:border-primary w-full rounded-md border-2 py-1 ps-10 text-lg font-normal text-gray-600 shadow-md outline-none placeholder:text-gray-400"
        />
        <FaSearch className="absolute top-3 left-2 text-lg text-gray-400" />
      </span>
    </>
  );
}
