import IconButton from "@/components/components/IconButton";
import { BsBookmark } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoenBookmarkButtonProps {
  onClick?: () => void;
}
export default function MilestoenBookmarkButton({
  onClick,
}: MilestoenBookmarkButtonProps) {
  return (
    <Tooltip
      label="북마크"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          <BsBookmark />
        </IconButton>
      </span>
    </Tooltip>
  );
}
