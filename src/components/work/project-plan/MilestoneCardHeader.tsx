import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import React from "react";

interface MilestoneCardHeaderProps {
  toggleOpened?: boolean;
}
export default function MilestoneCardHeader({
  toggleOpened = true,
}: MilestoneCardHeaderProps) {
  return (
    <div
      className={`flex duration-200 ${
        toggleOpened ? "flex-col items-start gap-8px" : "items-center gap-8px"
      }`}
    >
      <ProjectMilestoneEmoji
        className={`duration-200 ${toggleOpened ? "text-32px" : "text-22px"}`}
      />
      <div className="flex items-center gap-8px">
        <p
          className={`font-bold leading-[150%] text-gray-700 duration-200 ${
            toggleOpened ? "text-22px" : "text-16px"
          }`}
        >
          마일스톤 이름
        </p>
        <div className="rounded-full border border-red-500 px-8px py-4px text-12px text-red-500">
          긴급
        </div>
      </div>
    </div>
  );
}
