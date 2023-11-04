import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ColorKey } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { createTag, deleteTag, updateTag } from "@/utils/services/tag";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";
import { Tag } from "@/utils/types/tag.index";
import ColorPicker from "@/components/components/ColorPicker";

interface CreateUpdateTagFormProps {
  tag?: Tag;
  children: React.ReactNode;
  chidlrenWrapperClassName?: HTMLDivElement["className"];
  type: "create" | "update";
  parentIdType: "taskId" | "milestoneId";
  parentId: number;
}
export default function CreateUpdateTagForm({
  tag,
  children,
  chidlrenWrapperClassName,
  type,
  parentIdType,
  parentId,
}: CreateUpdateTagFormProps) {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();

  const [editing, setEditing] = useState(false);
  const [tagName, setTagName] = useState(() => tag?.name ?? "");
  const [tagColor, setTagColor] = useState<ColorKey>(
    () => tag?.color ?? "slate",
  );

  const onSuccess = () => {
    queryClient.invalidateQueries(
      parentIdType === "taskId"
        ? QueryKeys.getAllTasks()
        : QueryKeys.getAllMilestones(),
    );
    if (type === "create") {
      setTagName(tag?.name ?? "");
      setTagColor(tag?.color ?? "slate");
    }
  };

  const onError = (e: any) => {
    openToast({
      status: "error",
      title: "문제 발생",
      description:
        e?.response?.data?.message || "문제가 발생했습니다. 다시 시도해주세요.",
    });
  };

  const handleEdit = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const { mutate: createTagRequest } = useMutation(
    ["create-tag"],
    (data: CreateTagReqDto) => createTag(data),
    { onSuccess, onError },
  );

  const { mutate: updateTagRequest } = useMutation(
    ["update-tag"],
    (data: Partial<CreateTagReqDto>) => updateTag(tag!.id, data),
    { onSuccess, onError },
  );

  const { mutate: deleteTagRequest } = useMutation(
    ["delete-tag"],
    (id: number) => deleteTag(id),
    { onSuccess, onError },
  );

  const handleConfirm = () => {
    if (!tagName.trim()) return;

    if (type === "create") {
      createTagRequest({
        [parentIdType]: parentId,
        name: tagName,
        color: tagColor,
      });
    } else {
      if (!tag) return;
      updateTagRequest({
        [parentIdType]: parentId,
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
        <div onClick={handleEdit} className={chidlrenWrapperClassName}>
          {children}
        </div>
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
