import IconButton from "@/components/components/IconButton";
import { BsPencil } from "react-icons/bs";
import { PlacementWithLogical, Tooltip } from "@chakra-ui/react";
import React from "react";

interface EditButtonProps {
  onClick?: () => void;
  w?: number | string; // width
  h?: number | string; // width
  className?: HTMLButtonElement["className"];
  tooltipPlacement?: PlacementWithLogical;
}
export default function EditButton({
  onClick,
  w,
  h,
  className,
  tooltipPlacement,
}: EditButtonProps) {
  return (
    <Tooltip
      label="수정하기"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
      placement={tooltipPlacement}
    >
      <span>
        <IconButton onClick={onClick} className={className} w={w} h={h}>
          <BsPencil />
        </IconButton>
      </span>
    </Tooltip>
  );
}
