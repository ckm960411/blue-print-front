import ColorPicker from "@/components/components/ColorPicker";
import { ColorKey, Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { Task } from "@/utils/types/task";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface TaskColorFormProps {
  task: Task;
}
export default function TaskColorForm({ task }: TaskColorFormProps) {
  const {
    isOpen: isColorPickerOpen,
    onOpen: openColorPicker,
    onClose: closeColorPicker,
  } = useDisclosure();
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorKey>(() => task.color ?? "gray");

  const { mutate: updateTaskRequest } = useUpdateTaskMutation(task.id, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
    },
  });

  const handleUpdate = () => {
    updateTaskRequest({ color });
    closeColorPicker();
  };

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
        <ColorPicker color={color} onClick={(color) => setColor(color)} />
        <div className="mt-16px flex items-center justify-end gap-8px">
          <button
            onClick={closeColorPicker}
            className="rounded-md px-8px py-4px text-14px hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleUpdate}
            className="rounded-md px-8px py-4px text-14px hover:bg-gray-100"
          >
            확인
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
