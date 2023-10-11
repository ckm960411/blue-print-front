import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface ProjectPlanTabHeaderProps {}
export default function ProjectPlanTabHeader({}: ProjectPlanTabHeaderProps) {
  return (
    <div className="flex-between">
      <p className="text-22px font-bold">Milestone</p>
      {/* TODO: 버튼 클릭시 마일스톤 추가 */}
      <button className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50">
        <AiOutlinePlus />
        추가하기
      </button>
    </div>
  );
}
