import React from "react";
import CategoryCard from "./CategoryCard";

import { getNotionSections } from "@/utils/services/notion";

export default async function CategorySections() {
  const sections = await getNotionSections();

  return (
    <div className="flex flex-col gap-120px">
      {sections.map((section) => (
        <div key={section.id}>
          <p className="text-26px font-bold">{section.name}</p>
          <hr className="my-16px" />
          <div className="mt-24px grid grid-cols-1 gap-16px md:grid-cols-2 lg:grid-cols-3">
            {section.categories.map((page) => (
              <CategoryCard
                key={page.page_id}
                title={page.title}
                pageId={page.page_id}
                url={page.url}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
