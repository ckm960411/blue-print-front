import React from "react";

interface TaskTagsProps {}
export default function TaskTags({}: TaskTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-8px">
      <div className="rounded-xl bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600">
        Planning
      </div>
      <div className="rounded-xl bg-blue-50 px-12px py-6px text-14px font-semibold text-blue-600">
        개발중
      </div>
    </div>
  );
}
