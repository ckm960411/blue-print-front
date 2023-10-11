import React from "react";
import IconButton from "@/components/components/IconButton";
import { FiChevronDown } from "react-icons/fi";
import MilestoneTrashButton from "@/components/work/project-plan/tooltip-button/MilestoneTrashButton";
import MilestoneFullPageButton from "@/components/work/project-plan/tooltip-button/MilestoneFullPageButton";
import MilestoenSideTabButton from "@/components/work/project-plan/tooltip-button/MilestoenSideTabButton";
import MilestoenBookmarkButton from "@/components/work/project-plan/tooltip-button/MilestoenBookmarkButton";

interface MilestoneCardButtonsProps {
  toggleOpened: boolean;
  onToggleOpen: () => void;
  onDrawerOpen: () => void;
}
export default function MilestoneCardButtons({
  toggleOpened,
  onToggleOpen,
  onDrawerOpen,
}: MilestoneCardButtonsProps) {
  return (
    <div className="absolute right-16px top-16px flex items-center gap-8px">
      <MilestoneFullPageButton />
      <MilestoenSideTabButton onClick={onDrawerOpen} />
      <MilestoneTrashButton />
      <MilestoenBookmarkButton />
      <IconButton onClick={onToggleOpen}>
        <FiChevronDown
          className={`duration-200 ${toggleOpened ? "rotate-180" : "rotate-0"}`}
        />
      </IconButton>
    </div>
  );
}
