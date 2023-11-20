import ColorPicker from "@/components/components/ColorPicker";
import { ColorKey, Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import React, { useState } from "react";

interface MilestoneColorFormProps {
  milestone: Milestone;
}
export default function MilestoneColorForm({
  milestone,
}: MilestoneColorFormProps) {
  const {
    isOpen: isColorPickerOpen,
    onOpen: openColorPicker,
    onClose: closeColorPicker,
  } = useDisclosure();
  const queryClient = useQueryClient();

  const [color, setColor] = useState<ColorKey>(() => milestone.color ?? "gray");

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
      },
    },
  );

  const handleUpdate = () => {
    updateMilestoneRequest({ color });
    closeColorPicker();
  };

  return (
    <Popover isOpen={isColorPickerOpen} placement="bottom-start">
      <PopoverTrigger>
        <button
          onClick={openColorPicker}
          className="h-12px w-12px rounded-full"
          style={{ backgroundColor: Colors[milestone.color][500] }}
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
