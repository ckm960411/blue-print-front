import CreateUpdateTagForm from "@/components/work/components/task-card/CreateUpdateTagForm";
import { Task } from "@/utils/types/task";
import React from "react";

interface TaskTagsProps {
  task: Task;
}
export default function TaskTags({ task }: TaskTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-8px">
      {/*<div className="rounded-xl bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600">*/}
      {/*  Planning*/}
      {/*</div>*/}
      {/*<div className="rounded-xl bg-blue-50 px-12px py-6px text-14px font-semibold text-blue-600">*/}
      {/*  개발중*/}
      {/*</div>*/}
      <CreateUpdateTagForm type="create">
        <button className="rounded-md bg-gray-50 px-12px py-6px text-14px text-gray-600 duration-200 hover:bg-gray-100">
          태그 추가
        </button>
      </CreateUpdateTagForm>
    </div>
  );
}
