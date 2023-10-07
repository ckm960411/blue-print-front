import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getNotionPageById } from "@/utils/services/notion";

interface CategoryCardProps {
  title: string;
  pageId: string;
  url: string;
}
export default async function CategoryCard({
  title,
  pageId,
  url,
}: CategoryCardProps) {
  const data = await getNotionPageById(pageId);

  return (
    <Link href={`/study/${pageId}`}>
      <div className="flex items-center overflow-hidden rounded-10px shadow-md duration-200 hover:shadow-lg">
        <Image
          src={url}
          alt="목이미지"
          width={200}
          height={200}
          className="h-80px w-80px object-cover"
        />
        <div className="h-full grow p-16px">
          <p className="truncate-1-lines font-semibold">{title}</p>
        </div>
      </div>
    </Link>
  );
}
