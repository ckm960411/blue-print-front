import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import IconButton from "@/components/components/IconButton";

interface MemoSideTabProps {}
export default function MemoSideTab({}: MemoSideTabProps) {
  return (
    <div className="min-h-screen w-240px flex-shrink-0 border-r border-gray-200 bg-gray-50">
      <div className="p-16px text-18px font-semibold">All Memos</div>
      <div className="flex-between p-16px">
        <p className="text-12px text-gray-500">nn Memos</p>
        <div className="flex-center gap-4px">
          <IconButton
            w={24}
            className="h-16px bg-gray-50 text-gray-600 duration-200 hover:bg-gray-100 hover:text-main"
          >
            <FaCheck className="text-14px" />
          </IconButton>
          <IconButton
            w={24}
            className="h-16px bg-gray-50 text-gray-600 duration-200 hover:bg-gray-100 hover:text-main"
          >
            <FaRegBookmark className="text-14px" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col border-t border-gray-200">
        <div className="border-b border-gray-200 bg-white p-8px">
          <p className="truncate-2-lines text-14px leading-[140%] text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            exercitationem id perferendis quas ullam. Accusamus ad, explicabo
            fugiat hic laborum nam quos veniam voluptatibus. Architecto
            explicabo nam qui quidem soluta.
          </p>
          <div>1</div>
        </div>
      </div>
    </div>
  );
}
