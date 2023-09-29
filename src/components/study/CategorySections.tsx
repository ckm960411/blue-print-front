import React from "react";
import CategoryCard from "./CategoryCard";

import { PageIdAndUrl } from "@/app/api/notion/pages/route";
import { get } from "@/app/api/axios";

export default async function CategorySections() {
  const { data: pages } = await get<PageIdAndUrl[]>("api/notion/pages");

  return (
    <div className="flex flex-col gap-120px">
      <div>
        <p className="text-26px font-bold">Language & Framework</p>
        <hr className="my-16px" />
        <div className="mt-24px grid grid-cols-1 gap-16px md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <CategoryCard
              key={page.page_id}
              pageId={page.page_id}
              url={page.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
