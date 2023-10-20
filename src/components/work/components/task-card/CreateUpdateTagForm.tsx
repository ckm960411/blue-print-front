import { ColorKey, Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { createTag } from "@/utils/services/tag";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface CreateUpdateTagFormProps {
  children: React.ReactNode;
  chidlrenWrapperClassName?: HTMLDivElement["className"];
  type: "create" | "update";
  parentIdType: "taskId" | "milestoneId";
  parentId: number;
}
export default function CreateUpdateTagForm({
  children,
  chidlrenWrapperClassName,
  type,
  parentIdType,
  parentId,
}: CreateUpdateTagFormProps) {
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState<ColorKey>("slate");

  const handleEdit = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const { mutate: createTagRequest } = useMutation(
    ["create-tag"],
    (data: CreateTagReqDto) => createTag(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
      },
      onError: console.error,
    },
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
      //   update
    }

    handleClose();
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
          <div className="flex flex-wrap items-center gap-8px">
            {(Object.keys(Colors) as ColorKey[]).map((colorKey, i) => (
              <button
                key={i}
                onClick={() => setTagColor(colorKey)}
                className="h-20px w-20px flex-shrink-0 rounded-full border"
                style={{
                  backgroundColor: Colors[colorKey][50],
                  borderColor:
                    tagColor === colorKey
                      ? Colors[colorKey][500]
                      : Colors.gray[200],
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-8px">
          {type === "update" && (
            <button className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50">
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
            확인
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
