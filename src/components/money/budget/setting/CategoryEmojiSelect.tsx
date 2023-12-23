"use client";

import PickerWrapper from "@/components/components/PickerWrapper";
import Unicode, { EmojiType } from "@/components/components/Unicode";
import { useClickOutside } from "primereact/hooks";
import React, { useRef, useState } from "react";

interface CategoryEmojiSelectProps {
  unicode: string;
}
export default function CategoryEmojiSelect({
  unicode,
}: Readonly<CategoryEmojiSelectProps>) {
  const pickerWrapperRef = useRef<HTMLDivElement | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  useClickOutside(pickerWrapperRef, () => setShowPicker(false));

  const handleOpen = () => setShowPicker(true);
  const handleClose = () => setShowPicker(false);

  const handleEmojiSelect = ({ unified: unicode }: EmojiType) => {
    console.log("unicode", unicode);
    handleClose();
  };

  return (
    <div className="relative">
      <Unicode value={unicode} onClick={handleOpen} className="text-18px" />
      {showPicker && (
        <div ref={pickerWrapperRef} className="absolute left-0 top-0 z-10">
          <PickerWrapper onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}
