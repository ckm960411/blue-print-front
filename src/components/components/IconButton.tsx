import React from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  children?: React.ReactNode;
  w?: number | string; // width
  h?: number | string; // width
  className?: HTMLButtonElement["className"];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
function IconButton(
  { children, w = 32, h, className, onClick }: IconButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const mergedClassName = twMerge(
    "flex-center flex rounded-md bg-white duration-200 hover:bg-gray-50",
    className,
  );

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={mergedClassName}
      style={{ width: w, height: h ?? w }}
    >
      {children}
    </button>
  );
}

export default React.forwardRef(IconButton);
