import React from "react";
import Image from "next/image";
import javascriptImg from "../../../public/img/tmp/javascript.png";
import { CategoryCardData } from "@/utils/types/study";
import Link from "next/link";
import SpaceY from "../SpaceY";

interface CategoryCardProps {
  category: CategoryCardData;
}
export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, title, thumbnail, totalPostCount } = category;

  return (
    <Link href={`/study/${id}`}>
      <div className="flex items-center overflow-hidden rounded-10px shadow-md duration-200 hover:shadow-lg">
        <Image
          src={thumbnail}
          alt="목이미지"
          width={200}
          height={200}
          className="h-80px w-80px object-contain"
        />
        <div className="h-full grow p-16px">
          <p className="truncate-1-lines font-semibold">{title}</p>
          <SpaceY height={8} />
          <p className="text-14px font-medium text-gray-600">
            게시물 수: {totalPostCount}개
          </p>
        </div>
      </div>
    </Link>
  );
}
