import React from "react";
import CategoryCard from "./CategoryCard";
import { CategoryCardData } from "@/utils/types/study";

import javascriptImg from "../../../public/img/tmp/javascript.png";
import typescriptImg from "../../../public/img/tmp/typescript.png";
import reactImg from "../../../public/img/tmp/react.png";
import nextjsImg from "../../../public/img/tmp/nextjs.png";

export default function Categories() {
  const categories: CategoryCardData[] = [
    {
      id: 1,
      title: "JavaScript 마스터",
      thumbnail: javascriptImg.src,
      totalPostCount: 22,
    },
    {
      id: 2,
      title: "TypeScript 마스터",
      thumbnail: typescriptImg.src,
      totalPostCount: 15,
    },
    {
      id: 3,
      title: "React 마스터",
      thumbnail: reactImg.src,
      totalPostCount: 17,
    },
    {
      id: 4,
      title: "Next JS 마스터",
      thumbnail: nextjsImg.src,
      totalPostCount: 6,
    },
  ];

  return (
    <div>
      <hr className="my-24px" />
      <div className="min-h-[360px]">
        <p className="text-26px font-bold">Language & Framework</p>
        <div className="mt-24px grid grid-cols-3 gap-16px">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
