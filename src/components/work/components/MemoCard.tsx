import React from "react";
import { useRecoilValue } from "recoil";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMutation, useQueryClient } from "react-query";
import { format } from "date-fns";
import {
  BsBookmark,
  BsCheckLg,
  BsFillBookmarkFill,
  BsTrash,
} from "react-icons/bs";

import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { ColorKey, Colors } from "@/utils/common/color";
import { GET_ALL_MEMOS } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { deleteMemo } from "@/utils/services/memo";
import { Memo } from "@/utils/types/memo";

import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";

interface MemoCardProps {
  memo: Memo;
  onDelete?: () => void;
}
export default function MemoCard({ memo, onDelete }: Readonly<MemoCardProps>) {
  const DEFAULT_COLOR: ColorKey = "yellow";
  const { color, isChecked, isBookmarked, title, content, createdAt } = memo;

  const theme: ColorKey = color ?? DEFAULT_COLOR;

  const { openToast } = useToastMessage();
  const queryClient = useQueryClient();

  const project = useRecoilValue(projectState);

  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const { mutate: updateMemoRequest } = useUpdateMemoMutation({
    memoId: memo.id,
    milestoneId: memo.milestoneId ?? undefined,
  });

  const { mutate: deleteMemoRequest } = useMutation(
    ["delete-memo"],
    (id: number) => deleteMemo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_ALL_MEMOS]);
        onDelete?.();
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message ||
            "메모 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.",
        });
      },
    },
  );

  const handleDelete = () => {
    closeDeletePopup();
    deleteMemoRequest(memo.id);
  };

  return (
    <div
      className="relative flex w-full flex-col gap-8px rounded-r-[10px] border-l-4 border-green-500 bg-green-50 p-16px"
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
              updateMemoRequest({
                isChecked: !isChecked,
                projectId: project?.id,
              })
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
              updateMemoRequest({
                isBookmarked: !isBookmarked,
                projectId: project?.id,
              })
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
          <IconButton
            onClick={openDeletePopup}
            className="rounded-md bg-transparent text-18px hover:bg-transparent"
            w={24}
          >
            <BsTrash />
          </IconButton>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="break-all text-14px leading-[150%] text-gray-700"
      />
      <p className="text-14px text-gray-600">
        {format(new Date(createdAt), "yyyy.MM.dd")} (
        {getDayByAsiaSeoulFormat(new Date(createdAt))})
      </p>

      <DeletePopup
        open={isDeletePopupOpen}
        title="정말 이 메모를 삭제할까요?"
        onClose={closeDeletePopup}
        onComplete={handleDelete}
        className="right-8px top-8px text-14px"
      />
    </div>
  );
}
