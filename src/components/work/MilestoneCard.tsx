"use client";

import ProjectMilestoneEmoji from "@/components/work/ProjectMilestoneEmoji";
import { FiChevronDown } from "react-icons/fi";
import React, { useState } from "react";
import MileStoneCardContent from "@/components/work/MileStoneCardContent";

interface ProjectMilestoneCardProps {
  openContent?: boolean;
}
export default function MilestoneCard({
  openContent = false,
}: ProjectMilestoneCardProps) {
  const [open, setOpen] = useState(() => openContent);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="flex flex-col gap-16px rounded-10px border border-gray-200 p-16px">
      <div className="flex-between">
        <div className="flex items-center gap-8px">
          <ProjectMilestoneEmoji />
          <p className="text-16px font-medium text-gray-700">마일스톤 이름</p>
        </div>
        <button onClick={toggleOpen} className="flex-center h-32px w-32px">
          <FiChevronDown
            className={`duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
      {open && <MileStoneCardContent />}
    </div>
  );
}
