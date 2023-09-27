import React from "react";
import Image from "next/image";
import javascriptImg from "../../../../public/img/tmp/javascript.png";

interface CategoryPageProps {
  params: { categoryId: string };
}
export default function CategoryPage({
  params: { categoryId },
}: CategoryPageProps) {
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
        className="flex-center h-400px flex-col bg-blue-50"
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
          className="h-200px w-200px object-contain"
          priority
        />
        <div className="flex-center mt-32px flex-col gap-16px px-16px">
          <h1 className="text-32px font-bold">{category.title}</h1>
          <p className="font-semibold text-gray-700">{category.description}</p>
        </div>
      </div>
    </div>
  );
}
