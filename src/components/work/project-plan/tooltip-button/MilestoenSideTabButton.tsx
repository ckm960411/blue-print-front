import IconButton from "@/components/components/IconButton";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoenSideTabButtonProps {
  onClick?: () => void;
}
export default function MilestoenSideTabButton({
  onClick,
}: MilestoenSideTabButtonProps) {
  return (
    <Tooltip
      label="사이드탭에서 보기"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          <BsReverseLayoutSidebarInsetReverse />
        </IconButton>
      </span>
    </Tooltip>
  );
}
