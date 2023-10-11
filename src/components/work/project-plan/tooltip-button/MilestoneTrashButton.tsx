import React from "react";
import { Tooltip } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import IconButton from "@/components/components/IconButton";

interface MilestoneTrashButtonProps {
  onClick?: () => void;
}
export default function MilestoneTrashButton({
  onClick,
}: MilestoneTrashButtonProps) {
  return (
    <Tooltip
      label="휴지통"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          <BsTrash />
        </IconButton>
      </span>
    </Tooltip>
  );
}
