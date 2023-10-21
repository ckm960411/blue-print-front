import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import { Milestone } from "@/utils/types/milestone";
import React from "react";

interface MilestoneCardHeaderProps {
  milestone: Milestone;
  toggleOpened?: boolean;
}
export default function MilestoneCardHeader({
  milestone,
  toggleOpened = true,
}: MilestoneCardHeaderProps) {
  const { title, priority } = milestone;

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
          {title}
        </p>
        {priority === 5 && (
          <div className="rounded-full border border-red-500 px-8px py-4px text-12px text-red-500">
            긴급
          </div>
        )}
      </div>
    </div>
  );
}
