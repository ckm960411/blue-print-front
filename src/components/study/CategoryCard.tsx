import React from "react";
import Image from "next/image";
import Link from "next/link";
import { get } from "@/app/api/axios";
import { GetPageResDto } from "@/utils/types/notion";

interface CategoryCardProps {
  pageId: string;
  url: string;
}
export default async function CategoryCard({ pageId, url }: CategoryCardProps) {
  const {
    data: {
      properties: {
        title: { title },
      },
    },
  } = await get<GetPageResDto>(`/api/notion/pages/${pageId}`);

  const pageTitle = title[0].text.content;

  return (
    <Link href={`/study/${pageId}`}>
      <div className="flex items-center overflow-hidden rounded-10px shadow-md duration-200 hover:shadow-lg">
        <Image
          src={url}
          alt="목이미지"
          width={200}
          height={200}
          className="h-80px w-80px object-contain"
        />
        <div className="h-full grow p-16px">
          <p className="truncate-1-lines font-semibold">{pageTitle}</p>
        </div>
      </div>
    </Link>
  );
}
