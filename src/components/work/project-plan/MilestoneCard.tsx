"use client";

import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import React, { useState } from "react";
import MileStoneCardContent from "@/components/work/project-plan/MileStoneCardContent";
import MilestoneCardButtons from "@/components/work/project-plan/MilestoneCardButtons";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";

interface ProjectMilestoneCardProps {
  openContent?: boolean;
}
export default function MilestoneCard({
  openContent = false,
}: ProjectMilestoneCardProps) {
  const [open, setOpen] = useState(() => openContent);

  const handleToggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="relative flex flex-col gap-24px rounded-10px border border-gray-200 px-16px py-20px">
      <MilestoneCardButtons open={open} onToggleOpen={handleToggleOpen} />
      <MilestoneCardHeader open={open} />
      {open && <MileStoneCardContent />}
    </div>
  );
}
