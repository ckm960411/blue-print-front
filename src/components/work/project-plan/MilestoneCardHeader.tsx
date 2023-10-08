import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import React from "react";

interface MilestoneCardHeaderProps {
  open: boolean;
}
export default function MilestoneCardHeader({
  open,
}: MilestoneCardHeaderProps) {
  return (
    <div
      className={`flex duration-200 ${
        open ? "flex-col gap-8px" : "items-center gap-8px"
      }`}
    >
      <ProjectMilestoneEmoji
        className={`duration-200 ${open ? "text-32px" : "text-22px"}`}
      />
      <p
        className={`font-bold text-gray-700 duration-200 ${
          open ? "text-22px" : "text-16px"
        }`}
      >
        마일스톤 이름
      </p>
    </div>
  );
}
