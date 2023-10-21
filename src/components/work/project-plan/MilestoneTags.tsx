import CreateUpdateTagForm from "@/components/work/components/task-card/CreateUpdateTagForm";
import { Milestone } from "@/utils/types/milestone";
import React from "react";
import { Colors } from "@/utils/common/color";
import { AiOutlinePlus } from "react-icons/ai";

interface MilestoneTagsProps {
  milestone: Milestone;
}
export default function MilestoneTags({ milestone }: MilestoneTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-8px pr-24px">
      {milestone.tags.map((tag) => (
        <CreateUpdateTagForm
          key={tag.id}
          type="update"
          tag={tag}
          parentIdType="milestoneId"
          parentId={milestone.id}
        >
          <button
            className="rounded-xl bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600"
            style={{
              backgroundColor: Colors[tag.color][50],
              color: Colors[tag.color][600],
            }}
          >
            {tag.name}
          </button>
        </CreateUpdateTagForm>
      ))}
      <CreateUpdateTagForm
        type="create"
        parentIdType="milestoneId"
        parentId={milestone.id}
      >
        <button className="flex-center gap-4px rounded-md bg-gray-50 px-8px py-4px text-14px text-gray-600 duration-200 hover:bg-gray-100">
          <AiOutlinePlus className="text-12px" />
          <span>태그 추가</span>
        </button>
      </CreateUpdateTagForm>
    </div>
  );
}
