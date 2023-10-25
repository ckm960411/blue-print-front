import { ColorKey, Colors } from "@/utils/common/color";
import React from "react";

interface ColorPickerProps {
  color: ColorKey;
  onClick: (color: ColorKey) => void;
}
export default function ColorPicker({ color, onClick }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-8px">
      {Object.keys(Colors).map((c: string, i) => {
        const colorName = c as ColorKey;
        return (
          <button
            key={i}
            onClick={() => onClick(colorName)}
            className="h-20px w-20px flex-shrink-0 rounded-full border"
            style={{
              backgroundColor: Colors[colorName][50],
              borderColor:
                color === colorName ? Colors[colorName][500] : Colors.gray[200],
            }}
          />
        );
      })}
    </div>
  );
}
