import IconButton from "@/components/components/IconButton";
import { BsBookmark, BsPencil } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import React from "react";

interface MilestoneCardButtonsProps {
  open: boolean;
  onToggleOpen: () => void;
}
export default function MilestoneCardButtons({
  open,
  onToggleOpen,
}: MilestoneCardButtonsProps) {
  return (
    <div className="absolute right-16px top-16px flex items-center gap-8px">
      <IconButton>
        <BsPencil />
      </IconButton>
      <IconButton>
        <BsBookmark />
      </IconButton>
      <IconButton onClick={onToggleOpen}>
        <FiChevronDown
          className={`duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </IconButton>
    </div>
  );
}
