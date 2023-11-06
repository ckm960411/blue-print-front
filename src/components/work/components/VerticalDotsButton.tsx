import IconButton from "@/components/components/IconButton";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface VerticalDotsButtonProps {
  onClick: () => void;
}
export default function VerticalDotsButton({
  onClick,
}: VerticalDotsButtonProps) {
  return (
    <IconButton onClick={onClick} className="bg-white hover:bg-gray-50">
      <BiDotsVerticalRounded />
    </IconButton>
  );
}
