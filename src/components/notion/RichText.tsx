import { getColorByBlockColor } from "@/utils/common/notion";
import { RichText } from "@/utils/types/notion";
import React from "react";

interface RichTextProps {
  richText: RichText[];
}
export default function RichText({ richText }: RichTextProps) {
  return (
    <span>
      {richText.map(({ annotations, text: { content } }, i) => {
        const { bold, color, underline } = annotations;
        return (
          <span
            key={i}
            className={`${bold ? "font-bold" : ""} ${
              underline ? "underline" : ""
            } ${getColorByBlockColor(color)}`}
          >
            {content}
          </span>
        );
      })}
    </span>
  );
}
