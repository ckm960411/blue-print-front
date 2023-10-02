import React from "react";
import Image from "next/image";
import { getNotionPageById } from "@/utils/services/notion";
import StudyBlockList from "@/components/study/StudyBlockList";
import BreadCrumb from "@/components/study/BreadCrumb";

interface CategoryPageProps {
  params: { pageIds: string[] };
}
export default async function CategoryPage({
  params: { pageIds },
}: CategoryPageProps) {
  const pageId = pageIds.at(-1);

  if (!pageId) return <></>;

  const pageDatas = await Promise.all(
    pageIds.map((pageId) => getNotionPageById(pageId)),
  );

  const pageData = await getNotionPageById(pageId);

  if (!pageDatas) return <></>;

  const currentTitle =
    pageDatas.at(-1)?.properties?.title?.title?.[0]?.text?.content ?? "";
  const currentIcon =
    pageDatas.at(-1)?.icon?.file?.url ?? pageData.icon?.emoji ?? "";

  const linkDatas = pageDatas.map((pageData) => ({
    id: pageData.id,
    title: pageData.properties.title.title[0].text.content,
  }));

  return (
    <div>
      <BreadCrumb linkDatas={linkDatas} />
      <div
        className="flex-center mt-16px h-240px flex-col gap-16px rounded-10px bg-blue-50 md:h-320px lg:h-400px lg:gap-32px"
        style={{
          background:
            "linear-gradient(90deg, rgba(236,253,245,1) 0%, rgba(219,234,254,1) 100%)",
        }}
      >
        {pageData.icon?.file ? (
          <Image
            src={currentIcon}
            alt="study dashboard"
            width={1200}
            height={400}
            className="h-80px w-80px object-contain md:h-160px md:w-160px lg:h-200px lg:w-200px"
            priority
          />
        ) : (
          <span className="text-[80px] leading-[1] md:h-160px md:text-[160px] lg:h-200px lg:text-[200px]">
            {currentIcon}
          </span>
        )}
        <h1 className="text-22px font-bold md:text-32px">{currentTitle}</h1>
      </div>
      <div className="mt-24px">
        <StudyBlockList pageId={pageId} />
      </div>
    </div>
  );
}
