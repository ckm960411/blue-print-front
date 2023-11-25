import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

import { Tag } from "@/utils/types/tag.index";
import { ColorKey } from "@/utils/common/color";
import { useCreateTagMutation } from "@/utils/hooks/react-query/work/tag/useCreateTagMutation";
import { useUpdateTagMutation } from "@/utils/hooks/react-query/work/tag/useUpdateTagMutation";
import { useDeleteTagMutation } from "@/utils/hooks/react-query/work/tag/useDeleteTagMutation";

import ColorPicker from "@/components/components/ColorPicker";

interface CreateUpdateTagFormProps {
  tag?: Tag;
  children: React.ReactNode;
  chidlrenWrapperClassName?: HTMLDivElement["className"];
  type: "create" | "update";
  parentType: "milestone" | "task";
  parentId: number;
}
export default function CreateUpdateTagForm({
  tag,
  children,
  chidlrenWrapperClassName,
  type,
  parentType,
  parentId,
}: Readonly<CreateUpdateTagFormProps>) {
  const [editing, setEditing] = useState(false);
  const [tagName, setTagName] = useState(() => tag?.name ?? "");
  const [tagColor, setTagColor] = useState<ColorKey>(
    () => tag?.color ?? "slate",
  );

  const onReset = () => {
    setTagName(tag?.name ?? "");
    setTagColor(tag?.color ?? "slate");
  };

  const handleEdit = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const { mutate: createTagRequest } = useCreateTagMutation({
    parentType,
    parentId,
    onReset,
  });
  const { mutate: updateTagRequest } = useUpdateTagMutation({
    parentType,
    parentId,
    tagId: tag?.id,
  });

  const { mutate: deleteTagRequest } = useDeleteTagMutation({
    parentType,
    parentId,
  });

  const handleConfirm = () => {
    if (!tagName.trim()) return;

    if (type === "create") {
      createTagRequest({
        [parentType === "task" ? "taskId" : "milestoneId"]: parentId,
        name: tagName,
        color: tagColor,
      });
    } else {
      if (!tag) return;
      updateTagRequest({
        [parentType === "task" ? "taskId" : "milestoneId"]: parentId,
        name: tagName,
        color: tagColor,
      });
    }

    handleClose();
  };

  const handleDelete = () => {
    if (!tag) return;
    deleteTagRequest(tag.id);
  };

  return (
    <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
      <PopoverTrigger>
        <button onClick={handleEdit} className={chidlrenWrapperClassName}>
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-12px p-16px text-14px">
        <div className="flex items-center gap-12px">
          <span className="flex-shrink-0">이름: </span>
          <input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="태그 이름을 입력하세요"
            className="grow"
          />
        </div>
        <div className="flex items-start gap-12px">
          <span className="flex-shrink-0">색상: </span>
          <ColorPicker
            color={tagColor}
            onClick={(color) => setTagColor(color)}
          />
        </div>
        <div className="flex items-center justify-end gap-8px">
          {type === "update" && (
            <button
              onClick={handleDelete}
              className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
            >
              삭제
            </button>
          )}
          <button
            onClick={handleClose}
            className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
          >
            {type === "create" ? "확인" : "수정"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
