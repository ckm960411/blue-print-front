import { WorkTab } from "@/app/work/page";
import { FaPlus } from "react-icons/fa6";

interface WorkTabMenuPlusButtonProps {
  workTab: WorkTab;
}
export default function WorkTabMenuPlusButton({
  workTab,
}: Readonly<WorkTabMenuPlusButtonProps>) {
  return (
    <button className="flex-center gap-4px rounded-md bg-gray-50 px-8px py-4px text-14px font-semibold duration-200 hover:bg-gray-100">
      <FaPlus />
      <span>추가하기</span>
    </button>
  );
}
