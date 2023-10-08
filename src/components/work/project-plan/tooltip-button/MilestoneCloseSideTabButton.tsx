import IconButton from "@/components/components/IconButton";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoneCloseSideTabButtonProps {
  onClick?: () => void;
}
export default function MilestoneCloseSideTabButton({
  onClick,
}: MilestoneCloseSideTabButtonProps) {
  return (
    <Tooltip
      label="사이드탭 닫기"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton onClick={onClick}>
          <HiMiniChevronDoubleRight />
        </IconButton>
      </span>
    </Tooltip>
  );
}
