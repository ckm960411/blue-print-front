import ColorPicker from "@/components/components/ColorPicker";
import { ColorKey, Colors } from "@/utils/common/color";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React, { useState } from "react";

interface ColorFormProps {
  initialColor?: ColorKey;
  onConfirm: (color: ColorKey) => void;
}
export default function ColorForm({ initialColor, onConfirm }: ColorFormProps) {
  const {
    isOpen: isColorPickerOpen,
    onOpen: openColorPicker,
    onClose: closeColorPicker,
  } = useDisclosure();
  const [color, setColor] = useState<ColorKey>(() => initialColor ?? "yellow");

  return (
    <Popover isOpen={isColorPickerOpen} placement="bottom-start">
      <PopoverTrigger>
        <button
          onClick={openColorPicker}
          className="h-12px w-12px rounded-full"
          style={{ backgroundColor: Colors[initialColor ?? "yellow"][500] }}
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
            onClick={() => {
              onConfirm(color);
              closeColorPicker();
            }}
            className="rounded-md px-8px py-4px text-14px hover:bg-gray-100"
          >
            확인
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
