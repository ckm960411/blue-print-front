import { LuLayoutDashboard } from "react-icons/lu";
import { BsCalendar2Check } from "react-icons/bs";
import { CiStickyNote } from "react-icons/ci";
import { WorkSideContentType } from "@/utils/types/work";
import { Dispatch, SetStateAction } from "react";

interface WorkSideContentIconsProps {
  contentType: WorkSideContentType;
  setContentType: Dispatch<SetStateAction<WorkSideContentType>>;
}
export default function WorkSideContentIcons({
  contentType,
  setContentType,
}: WorkSideContentIconsProps) {
  const { OUTLINE, CALENDAR, MEMO } = WorkSideContentType;

  const handleClick = (type: WorkSideContentType) => {
    setContentType(type);
  };

  return (
    <div className="items-centert relative bottom-20px inline-flex gap-8px bg-white px-16px">
      <button
        onClick={() => handleClick(OUTLINE)}
        className={`flex-center flex h-40px w-40px rounded-10px border shadow-md duration-200 hover:border-blue-300 hover:text-blue-500 hover:shadow-lg ${
          contentType === OUTLINE
            ? "border-blue-300 text-blue-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        <LuLayoutDashboard />
      </button>
      <button
        onClick={() => handleClick(CALENDAR)}
        className={`flex-center flex h-40px w-40px rounded-10px border shadow-md duration-200 hover:border-blue-300 hover:text-blue-500 hover:shadow-lg ${
          contentType === CALENDAR
            ? "border-blue-300 text-blue-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        <BsCalendar2Check />
      </button>
      <button
        onClick={() => handleClick(MEMO)}
        className={`flex-center flex h-40px w-40px rounded-10px border text-22px shadow-md duration-200 hover:border-blue-300 hover:text-blue-500 hover:shadow-lg ${
          contentType === MEMO
            ? "border-blue-300 text-blue-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        <CiStickyNote />
      </button>
    </div>
  );
}
