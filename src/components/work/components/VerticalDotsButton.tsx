import IconButton from "@/components/components/IconButton";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface VerticalDotsButtonProps {
  onClick: () => void;
}
export default function VerticalDotsButton({
  onClick,
}: Readonly<VerticalDotsButtonProps>) {
  return (
    <IconButton onClick={onClick} w={24} className="bg-white hover:bg-gray-50">
      <BiDotsVerticalRounded />
    </IconButton>
  );
}
