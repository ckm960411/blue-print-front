"use client";

import { Block } from "@/utils/types/notion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { LuFileSymlink } from "react-icons/lu";

interface ChildPageBlockProps {
  block: Block;
}
export default function ChildPageBlock({ block }: ChildPageBlockProps) {
  const {
    id,
    has_children,
    child_page: { title },
  } = block;

  const { pageIds }: { pageIds: string[] } = useParams();
  const slashedPageIds = [...pageIds, id].join("/");

  return (
    <div className="my-4px">
      {has_children ? (
        <Link
          href={`/study/${slashedPageIds}`}
          className="inline-flex items-center gap-4px py-4px text-16px font-semibold text-gray-800 underline"
        >
          <LuFileSymlink className="h-22px w-22px" />
          <span>{title}</span>
        </Link>
      ) : (
        <p className="gap-4px py-4px text-16px font-semibold text-gray-800 underline">
          {title}
        </p>
      )}
    </div>
  );
}
