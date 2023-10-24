import IconButton from "@/components/components/IconButton";
import CreateProjectButton from "@/components/work/CreateProjectButton";
import React from "react";
import ProjectSelect from "@/components/work/ProjectSelect";
import { BsTrash } from "react-icons/bs";

interface WorkPageHeaderProps {}
export default function WorkPageHeader({}: WorkPageHeaderProps) {
  return (
    <div className="flex-shirnk-0 flex flex-col gap-8px border-b border-gray-200 px-24px pb-32px pt-16px">
      <div className="flex-between">
        <div className="flex items-center gap-16px">
          <h1 className="text-28px font-bold">My Work</h1>
          <ProjectSelect />
        </div>
        <div className="flex-center gap-8px">
          <CreateProjectButton />
          <IconButton
            className="rounded-md bg-transparent text-18px hover:bg-gray-100"
            w={24}
          >
            <BsTrash />
          </IconButton>
        </div>
      </div>
      <p className="text-14px text-gray-600">
        프로젝트에 대한 간단한 설명입니다.
      </p>
    </div>
  );
}
