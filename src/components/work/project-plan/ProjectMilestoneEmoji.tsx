"use client";

import Unicode, {
  EmojiType,
  laptopEmoji,
} from "@/components/components/Unicode";
import React, { useState } from "react";
import PickerWrapper from "@/components/components/PickerWrapper";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

interface ProjectMilestoneEmojiProps {
  className?: HTMLDivElement["className"];
}
export default function ProjectMilestoneEmoji({
  className,
}: ProjectMilestoneEmojiProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState<EmojiType>(laptopEmoji);

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  // TODO: 이모지 선택시 실제 데이터에 반영되도록
  const handleEmojiSelect = (data: EmojiType) => {
    setEmoji(data);
    handleClosePicker();
  };

  return (
    <Popover
      isOpen={showPicker}
      onClose={handleClosePicker}
      placement="bottom-start"
    >
      <div className="relative">
        <PopoverTrigger>
          <Unicode
            value={emoji.unified}
            onClick={() => setShowPicker(true)}
            className={`cursor-pointer text-22px ${className}`}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PickerWrapper onEmojiSelect={handleEmojiSelect} />
        </PopoverContent>
      </div>
    </Popover>
  );
}
