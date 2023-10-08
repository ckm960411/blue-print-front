"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React from "react";
import { EmojiType } from "@/components/components/Unicode";

interface PickerWrapperProps {
  onEmojiSelect?: (emoji: EmojiType) => void;
  onClickOutside?: () => void;
  wrapperClass?: HTMLDivElement["className"];
}
export default function PickerWrapper({
  onEmojiSelect,
  onClickOutside,
  wrapperClass,
}: PickerWrapperProps) {
  return (
    <div className={wrapperClass}>
      <Picker
        data={data}
        autoFocus
        locale="kr"
        onEmojiSelect={onEmojiSelect}
        onClickOutside={onClickOutside}
      />
    </div>
  );
}
