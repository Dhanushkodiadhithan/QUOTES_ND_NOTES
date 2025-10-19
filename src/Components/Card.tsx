import { CiHeart } from "react-icons/ci";
// import { GoShareAndroid } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";

interface Quote {
  _id: string;
  text: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  postedBy: string;
  likes: number;
  likedBy?: string[];
  savedBy?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface CardProps {
  quote: Quote;
}
function timeAgo(dateString: string | undefined): string {
  if (!dateString) return "";
  const now = new Date();
  const created = new Date(dateString);
  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function Card({ quote }: CardProps) {
  return (
    <div className="group my-5 h-[520px] w-[400px] transform cursor-pointer overflow-hidden rounded-2xl shadow-lg duration-300 ease-out hover:translate-y-[-5px]">
      <div className="h-[250px] overflow-hidden">
        <img
          src={`http://localhost:5000${quote.image}`}
          alt={quote.text}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
        />
      </div>
      <div className="h-full w-full p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-primary border-gray rounded-full border-2 px-2 py-1 text-sm">
            {quote.category}
          </span>
          <span className="px-2 py-1 text-sm text-gray-400">
            {timeAgo(quote.createdAt)}
          </span>
        </div>
        <div className="mb-3 text-lg">"{quote.text}"</div>
        <div className="mb-2 text-gray-600">-- {quote.author}</div>
        <div className="flex flex-wrap gap-2 border-b-2 border-gray-200 pb-2 text-sm text-gray-400">
          {quote.tags?.map((tag, idx) => (
            <span key={idx} className="bg-gray-50 px-2 py-1 text-sm">
              # {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-5 text-gray-600">
          <div className="flex items-center gap-3">
            <span className="flex gap-1">
              <CiHeart className="text-2xl" />
              {quote.likes}
            </span>
            {/* <span className="flex gap-1">
              <GoShareAndroid className="text-lg" />
              Share
            </span> */}
          </div>
          <div>
            <FaRegBookmark />
          </div>
        </div>
      </div>
    </div>
  );
}
