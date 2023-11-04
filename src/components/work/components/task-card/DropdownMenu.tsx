import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export interface DropdownMenuItem {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownMenuProps {
  open: boolean;
  menus: DropdownMenuItem[];
  onClose: () => void;
}
export default function DropdownMenu({
  open,
  menus,
  onClose,
}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(dropdownRef, onClose);

  if (!open) return <></>;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full z-10 w-100px rounded-10px border border-gray-200 bg-white py-8px shadow-md"
    >
      {menus.map(({ title, icon, onClick }, i) => (
        <div
          key={i}
          onClick={onClick}
          className="flex-center w-full cursor-pointer gap-8px bg-white p-8px text-14px hover:bg-gray-50"
        >
          {icon}
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
}
