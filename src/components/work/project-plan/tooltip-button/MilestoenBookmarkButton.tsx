import IconButton from "@/components/components/IconButton";
import { Milestone } from "@/utils/types/milestone";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoenBookmarkButtonProps {
  milestone: Milestone;
  onClick?: () => void;
}
export default function MilestoenBookmarkButton({
  milestone,
  onClick,
}: MilestoenBookmarkButtonProps) {
  const { isBookmarked } = milestone;
  return (
    <Tooltip
      label="북마크"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          {isBookmarked ? (
            <BsFillBookmarkFill className="text-red-500" />
          ) : (
            <BsBookmark className="text-gray-800" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
}
