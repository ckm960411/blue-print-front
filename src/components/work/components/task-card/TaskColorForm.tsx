import ColorPicker from "@/components/components/ColorPicker";
import { Colors } from "@/utils/common/color";
import { Task } from "@/utils/types/task";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";

interface TaskColorFormProps {
  task: Task;
}
export default function TaskColorForm({ task }: TaskColorFormProps) {
  const {
    isOpen: isColorPickerOpen,
    onOpen: openColorPicker,
    onClose: closeColorPicker,
  } = useDisclosure();

  return (
    <Popover isOpen={isColorPickerOpen} placement="bottom-start">
      <PopoverTrigger>
        <button
          onClick={openColorPicker}
          className="h-16px w-16px rounded-full"
          style={{ backgroundColor: Colors[task.color][500] }}
        />
      </PopoverTrigger>
      <PopoverContent className="max-w-[168px] p-16px">
        <ColorPicker color={task.color} onClick={() => {}} />
        <div className="mt-16px flex items-center justify-end gap-8px">
          <button
            onClick={closeColorPicker}
            className="rounded-md px-8px py-4px text-14px hover:bg-gray-100"
          >
            취소
          </button>
          <button
            // onClick={handleDelete}
            className="rounded-md px-8px py-4px text-14px hover:bg-gray-100"
          >
            확인
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
