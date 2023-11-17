import IconButton from "@/components/components/IconButton";
import { Milestone } from "@/utils/types/milestone";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrExpand } from "react-icons/gr";

interface MilestoneDetailNavProps {
  milestone: Milestone;
}
export default function MilestoneDetailNav({
  milestone,
}: MilestoneDetailNavProps) {
  return (
    <div className="flex h-32px items-center justify-between px-16px">
      <IconButton w={24}>
        <GrExpand className="text-12px" />
      </IconButton>
      <IconButton w={24}>
        <BiDotsVerticalRounded className="text-18px" />
      </IconButton>
    </div>
  );
}
