import { Block } from "@/utils/types/notion";
import React from "react";
import Caption from "./Caption";
import { getMetaDataByUrl } from "@/utils/services/crawling";
import Image from "next/image";
import Link from "next/link";

interface BookmarkBlockProps {
  block: Block;
}
export default async function BookmarkBlock({ block }: BookmarkBlockProps) {
  const {
    bookmark: { caption, url },
  } = block;

  if (!url) return <></>;

  const metaData = await getMetaDataByUrl(url);

  if (!metaData) return <></>;

  const { faviconLink, metaTags } = metaData;

  const image = Object.keys(metaTags).find((key) => key.includes("image"));
  const title = Object.keys(metaTags).find((key) => key.includes("title"));
  const description = Object.keys(metaTags).find((key) =>
    key.includes("description"),
  );

  const imageValue = image ? metaTags[image] : "";
  const titleValue = title ? metaTags[title] : "";
  const descriptionValue = description ? metaTags[description] : "";

  return (
    <div>
      <Link
        href={url}
        target="_blank"
        className="flex overflow-hidden rounded-10px border border-blue-200 duration-200 hover:border-blue-300 hover:shadow-md"
      >
        <div className="flex grow flex-col justify-between p-16px">
          <div className="flex flex-col gap-8px pb-8px">
            {titleValue && <p className="text-16px font-bold">{titleValue}</p>}
            {descriptionValue && (
              <p className="truncate-2-lines text-14px text-gray-500">
                {descriptionValue}
              </p>
            )}
          </div>
          <div className="flex items-center gap-6px">
            <Image
              src={`${url}${faviconLink}`}
              alt={url}
              width={18}
              height={18}
              className="h-18px w-18px rounded-10px"
            />
            <p className="text-12px text-gray-600">{url}</p>
          </div>
        </div>
        {imageValue && (
          <div
            className="min-h-100px w-200px flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageValue})` }}
          />
        )}
      </Link>
      <Caption caption={caption} />
    </div>
  );
}
