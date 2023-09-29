import Image from "next/image";
import React from "react";
import { Icon } from "@/utils/types/notion";

export default function NotionIcon({ icon }: { icon?: Icon }) {
  if (!icon) return <></>;

  if (icon?.type === "emoji") {
    return <span>{icon.emoji}</span>;
  }

  return (
    <Image
      src={icon?.file?.url || icon?.external?.url || ""}
      alt="icon"
      width={22}
      height={22}
      className="h-22px w-22px"
    />
  );
}
