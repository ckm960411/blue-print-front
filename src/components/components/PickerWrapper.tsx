"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React from "react";

interface PickerWrapperProps {
  onEmojiSelect?: () => void;
}
export default function PickerWrapper({ onEmojiSelect }: PickerWrapperProps) {
  return <Picker data={data} onEmojiSelect={onEmojiSelect} />;
}
