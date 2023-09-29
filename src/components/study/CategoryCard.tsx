import React from "react";
import Image from "next/image";
import javascriptImg from "../../../public/img/tmp/javascript.png";
import Link from "next/link";
import SpaceY from "../SpaceY";

interface CategoryCardProps {
  pageId: string;
  url: string;
}
export default function CategoryCard({ pageId, url }: CategoryCardProps) {
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
          {/* <p className="truncate-1-lines font-semibold">{title}</p> */}
          <p className="truncate-1-lines font-semibold">2</p>
        </div>
      </div>
    </Link>
  );
}
