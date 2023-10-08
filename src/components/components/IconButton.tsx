import { BsBookmark } from "react-icons/bs";
import React from "react";

interface IconButtonProps {
  children?: React.ReactNode;
  w?: number | string; // width
  h?: number | string; // width
  className?: HTMLButtonElement["className"];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function IconButton({
  children,
  w = 32,
  h,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-center flex rounded-10px bg-white duration-200 hover:bg-gray-50 ${className}`}
      style={{ width: w, height: h ?? w }}
    >
      {children}
    </button>
  );
}
