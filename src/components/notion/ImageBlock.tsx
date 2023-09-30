import { Block } from "@/utils/types/notion";
import Image from "next/image";
import React from "react";
import RichText from "./RichText";

interface ImageBlockProps {
  block: Block;
}
export default function ImageBlock({ block }: ImageBlockProps) {
  const { image } = block;

  const url = image?.file?.url ?? "";
  const caption = image?.caption ?? [];

  return (
    <div>
      <Image src={url} alt="" width={1024} height={720} className="w-full" />
      <p className="mt-8px text-14px text-gray-600">
        <RichText richText={caption} />
      </p>
    </div>
  );
}
