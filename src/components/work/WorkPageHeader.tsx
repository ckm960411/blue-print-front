import React from "react";
import ProjectMoreButton from "@/components/work/project/ProjectMoreButton";
import ProjectSelect from "@/components/work/project/ProjectSelect";

export default function WorkPageHeader() {
  return (
    <div className="flex-shirnk-0 relative flex flex-col gap-8px border-b border-gray-200 px-24px pb-16px pt-16px">
      <div className="flex items-center gap-16px">
        <h1 className="text-28px font-bold">My Work</h1>
        <ProjectSelect />
      </div>
      <ProjectMoreButton />
    </div>
  );
}
