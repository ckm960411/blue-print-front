import IconButton from "@/components/components/IconButton";
import { BsPencil } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoneEditButtonProps {
  onClick?: () => void;
}
export default function MilestoneEditButton({
  onClick,
}: MilestoneEditButtonProps) {
  return (
    <Tooltip
      label="수정하기"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          <BsPencil />
        </IconButton>
      </span>
    </Tooltip>
  );
}
