import React from "react";
import IconButton from "@/components/components/IconButton";
import {
  BsBookmark,
  BsPencil,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { PiNotebookLight } from "react-icons/pi";

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
        <PiNotebookLight className="text-22px" />
      </IconButton>
      <IconButton>
        <BsReverseLayoutSidebarInsetReverse />
      </IconButton>
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
