import React from "react";
import Image from "next/image";
import { getNotionPageById } from "@/utils/services/notion";
import StudyBlockList from "@/components/study/StudyBlockList";

interface CategoryPageProps {
  params: { pageId: string };
}
export default async function CategoryPage({
  params: { pageId },
}: CategoryPageProps) {
  const pageData = await getNotionPageById(pageId);

  const pageTitle = pageData.properties.title.title[0].text.content;
  const pageIcon = pageData.icon?.file?.url ?? "";

  return (
    <div>
      <div
        className="flex-center h-240px flex-col gap-16px rounded-10px bg-blue-50 md:h-320px lg:h-400px lg:gap-32px"
        style={{
          background:
            "linear-gradient(90deg, rgba(236,253,245,1) 0%, rgba(219,234,254,1) 100%)",
        }}
      >
        <Image
          src={pageIcon}
          alt="study dashboard"
          width={1200}
          height={400}
          className="h-80px w-80px object-contain md:h-160px md:w-160px lg:h-200px lg:w-200px"
          priority
        />
        <h1 className="text-22px font-bold md:text-32px">{pageTitle}</h1>
      </div>
      <div className="mt-24px">
        <StudyBlockList pageId={pageId} />
      </div>
    </div>
  );
}
