import IconButton from "@/components/components/IconButton";
import { PiNotebookLight } from "react-icons/pi";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoneFullPageButtonProps {
  onClick?: () => void;
}
export default function MilestoneFullPageButton({
  onClick,
}: MilestoneFullPageButtonProps) {
  return (
    <Tooltip
      label="전체 페이지로 보기"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          <PiNotebookLight className="text-22px" />
        </IconButton>
      </span>
    </Tooltip>
  );
}
