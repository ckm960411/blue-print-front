import CreateUpdateTagForm from "@/components/work/components/form/CreateUpdateTagForm";
import { Colors } from "@/utils/common/color";
import { Tag } from "@/utils/types/tag.index";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface TagsFormProps {
  tags: Tag[];
  parentType: "milestone" | "task";
  parentId: number;
}
export default function TagsForm({
  tags,
  parentId,
  parentType,
}: TagsFormProps) {
  if (tags.length === 0)
    return (
      <CreateUpdateTagForm
        type="create"
        parentType={parentType}
        parentId={parentId}
      >
        <button className="flex-center gap-4px rounded-md bg-gray-50 px-8px py-4px text-14px text-gray-600 duration-200 hover:bg-gray-100">
          <AiOutlinePlus className="text-12px" />
          <span>태그 추가</span>
        </button>
      </CreateUpdateTagForm>
    );

  return (
    <div className="flex flex-wrap items-center gap-8px pr-24px">
      {tags.map((tag) => (
        <CreateUpdateTagForm
          key={tag.id}
          type="update"
          tag={tag}
          parentType={parentType}
          parentId={parentId}
        >
          <button
            className="rounded-md bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600"
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
        parentType={parentType}
        parentId={parentId}
      >
        <button className="flex-center gap-4px rounded-md bg-gray-50 px-8px py-4px text-14px text-gray-600 duration-200 hover:bg-gray-100">
          <AiOutlinePlus className="text-12px" />
          <span>태그 추가</span>
        </button>
      </CreateUpdateTagForm>
    </div>
  );
}
