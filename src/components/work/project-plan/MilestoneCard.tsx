"use client";

import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import { FiChevronDown } from "react-icons/fi";
import React, { useState } from "react";
import MileStoneCardContent from "@/components/work/project-plan/MileStoneCardContent";
import { BsBookmark } from "react-icons/bs";
import IconButton from "@/components/components/IconButton";

interface ProjectMilestoneCardProps {
  openContent?: boolean;
}
export default function MilestoneCard({
  openContent = false,
}: ProjectMilestoneCardProps) {
  const [open, setOpen] = useState(() => openContent);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="relative flex flex-col gap-16px rounded-10px border border-gray-200 px-16px py-20px">
      <div
        className={`flex duration-200 ${
          open ? "flex-col gap-8px" : "items-center gap-8px"
        }`}
      >
        <ProjectMilestoneEmoji
          className={`duration-200 ${open ? "text-32px" : "text-22px"}`}
        />
        <p
          className={`text-gray-700 duration-200 ${
            open ? "text-22px font-bold" : "text-16px font-medium"
          }`}
        >
          마일스톤 이름
        </p>
      </div>
      <div className="absolute right-16px top-16px flex items-center gap-8px">
        <IconButton>
          <BsBookmark />
        </IconButton>
        <IconButton onClick={toggleOpen}>
          <FiChevronDown
            className={`duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </IconButton>
      </div>
      {open && <MileStoneCardContent />}
    </div>
  );
}
