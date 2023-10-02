import { Block } from "@/utils/types/notion";
import Image from "next/image";
import React from "react";
import Caption from "./Caption";

interface ImageBlockProps {
  block: Block;
}
export default function ImageBlock({ block }: ImageBlockProps) {
  const {
    image: { file, caption },
  } = block;

  const url = file?.url ?? "";

  return (
    <div className="my-8px">
      <Image
        src={url}
        alt=""
        width={1024}
        height={720}
        className="w-full rounded-10px shadow-lg"
      />
      <Caption caption={caption} />
    </div>
  );
}
