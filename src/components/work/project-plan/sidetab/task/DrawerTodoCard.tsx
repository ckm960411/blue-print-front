import React from "react";
import { Checkbox } from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import IconButton from "@/components/components/IconButton";

interface DrawerTodoCardProps {
  checked: boolean;
  title: string;
  description?: string;
}
export default function DrawerTodoCard({
  checked,
  title,
  description,
}: DrawerTodoCardProps) {
  return (
    <div className="flex flex-col gap-8px rounded-10px bg-gray-50 p-16px">
      <div className="flex-between">
        <Checkbox
          isChecked={checked}
          className="text-16px font-semibold text-gray-800"
        >
          {title}
        </Checkbox>
        <IconButton className="bg-gray-50 hover:bg-gray-100">
          <BiDotsVerticalRounded />
        </IconButton>
      </div>
      {description && (
        <div className="pl-24px text-14px leading-[140%] text-gray-600">
          {description}
        </div>
      )}
    </div>
  );
}
