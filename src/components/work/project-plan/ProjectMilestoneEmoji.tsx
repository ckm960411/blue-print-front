"use client";

import Unicode, {
  EmojiType,
  laptopEmoji,
} from "@/components/components/Unicode";
import React, { useState } from "react";
import PickerWrapper from "@/components/components/PickerWrapper";

interface ProjectMilestoneEmojiProps {
  className?: HTMLDivElement["className"];
}
export default function ProjectMilestoneEmoji({
  className,
}: ProjectMilestoneEmojiProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState<EmojiType>(laptopEmoji);

  const handleClosePicker = () => setShowPicker(false);

  // TODO: 이모지 선택시 실제 데이터에 반영되도록
  const handleEmojiSelect = (data: EmojiType) => {
    setEmoji(data);
    handleClosePicker();
  };

  return (
    <div className="relative">
      <Unicode
        value={emoji.unified}
        onClick={() => setShowPicker(true)}
        className={`cursor-pointer text-22px ${className}`}
      />
      {showPicker && (
        <PickerWrapper
          onEmojiSelect={handleEmojiSelect}
          onClickOutside={handleClosePicker}
          wrapperClass="absolute top-0 left-[calc(100%+16px)] shadow-md rounded-10px overflow-hidden"
        />
      )}
    </div>
  );
}
