import React from "react";
import IconButton from "@/components/components/IconButton";
import {
  BsBookmark,
  BsPencil,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { PiNotebookLight } from "react-icons/pi";
import { Tooltip } from "@chakra-ui/react";

interface MilestoneCardButtonsProps {
  toggleOpened: boolean;
  onToggleOpen: () => void;
}
export default function MilestoneCardButtons({
  toggleOpened,
  onToggleOpen,
}: MilestoneCardButtonsProps) {
  return (
    <div className="absolute right-16px top-16px flex items-center gap-8px">
      <Tooltip
        label="전체 페이지로 보기"
        className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
      >
        <span>
          <IconButton>
            <PiNotebookLight className="text-22px" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        label="사이드탭에서 보기"
        className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
      >
        <span>
          <IconButton>
            <BsReverseLayoutSidebarInsetReverse />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        label="수정하기"
        className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
      >
        <span>
          <IconButton>
            <BsPencil />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        label="북마크"
        className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
      >
        <span>
          <IconButton>
            <BsBookmark />
          </IconButton>
        </span>
      </Tooltip>
      <IconButton onClick={onToggleOpen}>
        <FiChevronDown
          className={`duration-200 ${toggleOpened ? "rotate-180" : "rotate-0"}`}
        />
      </IconButton>
    </div>
  );
}
