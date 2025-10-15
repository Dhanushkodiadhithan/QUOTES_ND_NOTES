import { IoCompassOutline } from "react-icons/io5";
import { RiEmotionHappyLine } from "react-icons/ri";
import { LiaWineGlassSolid } from "react-icons/lia";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuQuote } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { changeCategory } from "../Redux/Slices/Feedslice";
import { useDispatch,useSelector } from "react-redux";
const categories = [
  {
    label: "All Quotes",
    count: 1240,
    icon: <LuQuote className="text-lg" />,
  },
  {
    label: "Motivation",
    count: 312,
    icon: <AiOutlineThunderbolt className="text-lg" />,
  },
  {
    label: "Love",
    count: 185,
    icon: <FaRegHeart className="text-lg" />,
  },
  {
    label: "Success",
    count: 240,
    icon: <LiaWineGlassSolid className="text-lg" />,

  },
  {
    label: "Life",
    count: 298,
    icon: <IoCompassOutline className="text-lg" />,
  },
  {
    label: "Happiness",
    count: 156,
    icon: <RiEmotionHappyLine className="text-lg" />,
   
  },
];
export default function CategoryBar() {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: any) => state.feeds.activeCategory);
  return (
    <>
      <div className="sticky top-16 z-30 h-[70px] w-full bg-white shadow-md">
        <div className="container mx-auto flex h-full items-center justify-between px-10">
          {categories.map((cat) => (
            <span
              key={cat.label}
              className="text-2xl font-bold transition-transform hover:scale-105 hover:text-black "
            onClick={() => dispatch(changeCategory(cat.label))}
            >
              <span
                className={`flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2 transition-all duration-300 ${activeCategory === cat.label ? 'text-white bg-primary' : 'text-black bg-gray-100 '} `}
              >
                {cat.icon}
                <span className="text-sm">
                  {cat.label} <span className="ps-2">{cat.count}</span>
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
