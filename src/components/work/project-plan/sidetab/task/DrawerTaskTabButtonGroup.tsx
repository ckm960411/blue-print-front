import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

interface DrawerTaskTabButtonGroupProps {}
export default function DrawerTaskTabButtonGroup({}: DrawerTaskTabButtonGroupProps) {
  return (
    <div className="flex items-center justify-end gap-8px">
      {/* TODO: 선택한 투두가 있을 때만 버튼 노출 */}
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <button className="rounded-md border border-gray-200 px-8px py-6px text-14px text-gray-600 hover:bg-gray-100">
            상태 변경
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-120px py-8px">
          <button className="p-10px text-left text-14px font-medium hover:bg-blue-50">
            TO DO
          </button>
          <button className="p-8px text-left text-14px font-medium hover:bg-blue-50">
            IN PROGRESS
          </button>
          <button className="p-8px text-left text-14px font-medium hover:bg-blue-50">
            DONE
          </button>
        </PopoverContent>
      </Popover>
      <button className="rounded-md border border-gray-200 px-8px py-6px text-14px text-gray-600 hover:bg-gray-100">
        할일 추가
      </button>
    </div>
  );
}
