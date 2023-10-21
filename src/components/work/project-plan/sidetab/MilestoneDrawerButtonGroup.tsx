import MilestoneCloseSideTabButton from "@/components/work/project-plan/tooltip-button/MilestoneCloseSideTabButton";
import MilestoneFullPageButton from "@/components/work/project-plan/tooltip-button/MilestoneFullPageButton";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import MilestoenBookmarkButton from "@/components/work/project-plan/tooltip-button/MilestoenBookmarkButton";
import { Milestone } from "@/utils/types/milestone";
import React from "react";

interface MilestoneDrawerButtonGroupProps {
  milestone: Milestone;
  onClose: () => void;
}
export default function MilestoneDrawerButtonGroup({
  milestone,
  onClose,
}: MilestoneDrawerButtonGroupProps) {
  return (
    <div className="flex-between">
      <div className="flex items-center gap-8px p-8px">
        <MilestoneCloseSideTabButton onClick={onClose} />
        <MilestoneFullPageButton />
      </div>
      <div className="flex items-center gap-8px p-8px">
        <MilestoneEditButton />
        <MilestoenBookmarkButton milestone={milestone} />
      </div>
    </div>
  );
}
