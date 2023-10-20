import CreateUpdateTagForm from "@/components/work/components/task-card/CreateUpdateTagForm";
import { Colors } from "@/utils/common/color";
import { Task } from "@/utils/types/task";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface TaskTagsProps {
  task: Task;
}
export default function TaskTags({ task }: TaskTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-8px">
      {task.tags.map((tag) => (
        <div
          key={tag.id}
          className="rounded-xl bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600"
          style={{
            backgroundColor: Colors[tag.color][50],
            color: Colors[tag.color][600],
          }}
        >
          {tag.name}
        </div>
      ))}
      <CreateUpdateTagForm
        type="create"
        parentIdType="taskId"
        parentId={task.id}
      >
        <button className="flex-center gap-4px rounded-md bg-gray-50 px-8px py-4px text-14px text-gray-600 duration-200 hover:bg-gray-100">
          <AiOutlinePlus className="text-12px" />
          <span>태그 추가</span>
        </button>
      </CreateUpdateTagForm>
    </div>
  );
}
