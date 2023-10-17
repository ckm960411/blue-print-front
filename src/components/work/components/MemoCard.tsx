import IconButton from "@/components/components/IconButton";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { ColorKey, Colors } from "@/utils/common/color";
import { GET_ALL_MEMOS, QueryKeys } from "@/utils/common/query-keys";
import {
  deleteMemo,
  updateMemo,
  UpdateMemoReqDto,
} from "@/utils/services/memo";
import { Memo } from "@/utils/types/memo";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import {
  BsBookmark,
  BsCheckLg,
  BsFillBookmarkFill,
  BsTrash,
} from "react-icons/bs";

interface MemoCardProps {
  memo: Memo;
  onDelete?: () => void;
}
export default function MemoCard({ memo, onDelete }: MemoCardProps) {
  const DEFAULT_COLOR: ColorKey = "yellow";
  const { color, isChecked, isBookmarked, title, content, createdAt } = memo;

  const theme: ColorKey = (color as ColorKey) ?? DEFAULT_COLOR;

  const toast = useRef<Toast | null>(null);
  const queryClient = useQueryClient();

  const [openPopup, setOpenPopup] = useState(false);

  const { mutate: updateMemoRequest } = useMutation(
    ["update-memo"],
    ({ id, ...data }: { id: number } & UpdateMemoReqDto) =>
      updateMemo(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_ALL_MEMOS]);
      },
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail: "메모 업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
        });
      },
    },
  );

  const { mutate: deleteMemoRequest } = useMutation(
    ["delete-memo"],
    (id: number) => deleteMemo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_ALL_MEMOS]);
        onDelete?.();
      },
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail: "메모 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.",
        });
      },
    },
  );

  const handleDelete = () => {
    setOpenPopup(false);
    deleteMemoRequest(memo.id);
  };

  return (
    <>
      <Toast ref={toast} />
      <div
        className="flex w-full flex-col gap-8px rounded-r-[10px] border-l-4 border-green-500 bg-green-50 p-16px"
        style={{
          borderColor: Colors[theme][500],
          backgroundColor: Colors[theme][50],
        }}
      >
        <div className="flex-between">
          <p className="truncate-1-lines text-16px font-bold text-gray-800">
            {title}
          </p>
          <div className="flex items-center gap-8px">
            <IconButton
              onClick={() =>
                updateMemoRequest({ id: memo.id, isChecked: !isChecked })
              }
              className="rounded-md bg-transparent text-16px hover:bg-transparent"
              w={24}
            >
              <BsCheckLg
                className={isChecked ? "text-green-500" : "text-gray-800"}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                updateMemoRequest({ id: memo.id, isBookmarked: !isBookmarked })
              }
              className="rounded-md bg-transparent text-16px hover:bg-transparent"
              w={24}
            >
              {isBookmarked ? (
                <BsFillBookmarkFill className="text-red-500" />
              ) : (
                <BsBookmark className="text-gray-800" />
              )}
            </IconButton>
            <Popover isOpen={openPopup} placement="bottom-end">
              <PopoverTrigger>
                <IconButton
                  onClick={() => setOpenPopup(true)}
                  className="rounded-md bg-transparent text-18px hover:bg-transparent"
                  w={24}
                >
                  <BsTrash />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent className="max-w-[240px] p-16px text-14px font-medium text-gray-800">
                <div>정말 이 메모를 삭제할까요?</div>
                <div className="mt-16px flex items-center justify-end gap-8px">
                  <button
                    onClick={() => setOpenPopup(false)}
                    className="rounded-md px-8px py-4px hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-md px-8px py-4px hover:bg-gray-100"
                  >
                    확인
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-14px leading-[150%] text-gray-700"
        />
        <p className="text-14px text-gray-600">
          {format(new Date(createdAt), "yyyy.MM.dd")} (
          {getDayByAsiaSeoulFormat(new Date(createdAt))})
        </p>
      </div>
    </>
  );
}
