"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "react-query";

import BlockList from "@/components/study/BlockList";
import { getBlockList } from "@/utils/common/study/notion/getBlockList";
import { getPagesData } from "@/utils/services/notion";
import BreadCrumb from "@/components/study/BreadCrumb";

interface CategoryPageProps {
  params: { pageIds: string[] };
}
export default function CategoryPage({
  params: { pageIds },
}: CategoryPageProps) {
  const pageId = pageIds.at(-1);

  const { data: pageDatas } = useQuery(
    ["get-pages-data", pageIds],
    () => getPagesData(pageIds),
    { enabled: pageIds.length > 0, onError: console.error },
  );

  const {
    data: blockData,
    isFetching: isBlockFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["notion-blocks", pageId],
    async ({ pageParam }: { pageParam?: string }) => {
      if (!pageId) return Promise.reject(new Error("no pageId"));
      return getBlockList([pageId], { start_cursor: pageParam });
    },
    {
      enabled: !!pageId,
      getNextPageParam: ({ next_cursor }) => next_cursor,
      onError: console.error,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (isBlockFetching || !hasNextPage) return;

    fetchNextPage();
  }, [isBlockFetching, hasNextPage]);

  if (!pageId || !pageDatas) return <></>;

  const currentPageData = pageDatas.at(-1);

  const currentTitle =
    currentPageData?.properties?.title?.title?.[0]?.text?.content ?? "";
  const currentIcon =
    currentPageData?.icon?.file?.url ?? currentPageData?.icon?.emoji ?? "";

  const linkDatas = pageDatas.map((pageData) => ({
    id: pageData.id,
    title: pageData.properties.title.title[0].text.content,
  }));

  if (!blockData) return <></>;

  const blocks = blockData.pages.flatMap((page) => page.blocks);

  return (
    <div className="p-16px">
      <BreadCrumb linkDatas={linkDatas} />
      <div
        className="flex-center mt-16px h-240px flex-col gap-16px rounded-10px bg-blue-50 md:h-320px lg:h-400px lg:gap-32px"
        style={{
          background:
            "linear-gradient(90deg, rgba(236,253,245,1) 0%, rgba(219,234,254,1) 100%)",
        }}
      >
        {currentPageData?.icon?.file ? (
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
        <h1 className="break-normal px-16px text-center text-22px font-bold md:text-32px">
          {currentTitle}
        </h1>
      </div>
      <div className="mt-24px">
        <BlockList blocks={blocks} />
      </div>
    </div>
  );
}
