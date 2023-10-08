import { LuLayoutDashboard } from "react-icons/lu";
import { BsCalendar2Check } from "react-icons/bs";
import { CiStickyNote } from "react-icons/ci";

interface WorkSideContentIconsProps {}
export default function WorkSideContentIcons({}: WorkSideContentIconsProps) {
  return (
    <div className="items-centert relative bottom-20px inline-flex gap-8px bg-white px-16px">
      <button className="flex-center h-40px w-40px rounded-10px border border-gray-300 text-gray-500 shadow-md duration-200 hover:border-blue-300 hover:text-blue-300 hover:shadow-lg">
        <LuLayoutDashboard />
      </button>
      <button className="flex-center h-40px w-40px rounded-10px border border-gray-300 text-gray-500 shadow-md duration-200 hover:border-blue-300 hover:text-blue-300 hover:shadow-lg">
        <BsCalendar2Check />
      </button>
      <button className="flex-center h-40px w-40px rounded-10px border border-gray-300 text-22px text-gray-500 shadow-md duration-200 hover:border-blue-300 hover:text-blue-300 hover:shadow-lg">
        <CiStickyNote />
      </button>
    </div>
  );
}
