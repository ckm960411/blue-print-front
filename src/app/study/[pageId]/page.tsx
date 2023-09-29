import React from "react";
import Image from "next/image";
import javascriptImg from "../../../../public/img/tmp/javascript.png";
import axios from "axios";

interface CategoryPageProps {
  params: { pageId: string };
}
export default async function CategoryPage({
  params: { pageId },
}: CategoryPageProps) {
  const notion = await axios
    .get(`http://localhost:3000/api/notion`)
    .then((res) => res.data)
    .catch((e) => console.log("e: ", e));

  const category = {
    id: 1,
    title: "JavaScript 마스터",
    description: `const JavaScript = () => { console.log('JavaScript 의 세계에 오신 것을 환영합니다.') }`,
    thumbnail: javascriptImg,
    totalPostCount: 22,
  };

  return (
    <div>
      <div
        className="flex-center h-240px flex-col rounded-10px bg-blue-50 md:h-320px lg:h-400px"
        style={{
          background:
            "linear-gradient(90deg, rgba(236,253,245,1) 0%, rgba(219,234,254,1) 100%)",
        }}
      >
        <Image
          src={category.thumbnail}
          alt="study dashboard"
          width={1200}
          height={400}
          className="h-80px w-80px object-contain md:h-160px md:w-160px lg:h-200px lg:w-200px"
          priority
        />
        <div className="flex-center mt-16px flex-col gap-16px px-16px lg:mt-32px">
          <h1 className="text-22px font-bold md:text-32px">{category.title}</h1>
          <p className="px-48px text-center font-semibold text-gray-700">
            {category.description}
          </p>
        </div>
      </div>
      {Object.values(notion.block ?? {}).map((b: any, i: number) => (
        <div key={i} className="text-24px font-bold hover:text-main">
          {b?.value?.format?.page_icon} {b?.value?.properties?.title?.[0]}
        </div>
      ))}
    </div>
  );
}
