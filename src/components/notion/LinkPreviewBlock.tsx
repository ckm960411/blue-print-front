import { getMetaDataByUrl } from "@/utils/services/crawling";
import { Block } from "@/utils/types/notion";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface LinkPreviewBlockProps {
  block: Block;
}
export default async function LinkPreviewBlock({
  block,
}: LinkPreviewBlockProps) {
  const {
    link_preview: { url },
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
    <Link
      href={url}
      target="_blank"
      className="my-8px flex overflow-hidden rounded-10px border border-blue-200 duration-200 hover:border-blue-300 hover:shadow-md"
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
          className="min-h-100px w-full max-w-[200px] flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageValue})` }}
        />
      )}
    </Link>
  );
}
