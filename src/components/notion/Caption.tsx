import { RichText } from "@/utils/types/notion";
import React from "react";
import RichTextComponent from "./RichText";

interface CaptionProps {
  caption: RichText[] | undefined;
}
export default function Caption({ caption }: CaptionProps) {
  if (!caption || caption.length === 0) {
    return <></>;
  }

  return (
    <p className="mt-8px px-16px text-14px text-gray-600">
      <RichTextComponent richText={caption} />
    </p>
  );
}
