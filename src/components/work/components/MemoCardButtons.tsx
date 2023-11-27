import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";
import { GET_ALL_MEMOS } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import { projectState } from "@/utils/recoil/store";
import { deleteMemo } from "@/utils/services/memo";
import { Memo } from "@/utils/types/memo";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import {
  BsBookmark,
  BsCheckLg,
  BsFillBookmarkFill,
  BsTrash,
} from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface MemoCardButtonsProps {
  memo: Memo;
  onDelete?: () => void;
}
export default function MemoCardButtons({
  memo,
  onDelete,
}: Readonly<MemoCardButtonsProps>) {
  const { id, milestoneId, isBookmarked, isChecked } = memo;

  const project = useRecoilValue(projectState);
  const { openToast } = useToastMessage();
  const queryClient = useQueryClient();

  const { mutate: updateMemoRequest } = useUpdateMemoMutation({
    memoId: id,
    milestoneId: milestoneId ?? undefined,
  });

  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

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
    <>
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

      <DeletePopup
        open={isDeletePopupOpen}
        title="정말 이 메모를 삭제할까요?"
        onClose={closeDeletePopup}
        onComplete={handleDelete}
        className="right-8px top-8px text-14px"
      />
    </>
  );
}
