import React from "react";
import { useRecoilValue } from "recoil";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  BsBookmark,
  BsCheckLg,
  BsFillBookmarkFill,
  BsTrash,
} from "react-icons/bs";

import { useDeleteMemoMutation } from "@/utils/hooks/react-query/work/memo/useDeleteMemoMutation";
import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import { projectState } from "@/utils/recoil/store";
import { Memo } from "@/utils/types/memo";

import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";

interface MemoCardButtonsProps {
  memo: Memo;
  milestoneId?: number;
}
export default function MemoCardButtons({
  memo,
  milestoneId,
}: Readonly<MemoCardButtonsProps>) {
  const { id, isBookmarked, isChecked } = memo;

  const project = useRecoilValue(projectState);

  const { mutate: updateMemoRequest } = useUpdateMemoMutation({
    memoId: id,
    milestoneId: milestoneId,
  });

  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const { mutate: deleteMemoRequest } = useDeleteMemoMutation({
    memoId: id,
    milestoneId: memo.milestoneId ?? undefined,
  });

  const handleDelete = () => {
    closeDeletePopup();
    deleteMemoRequest();
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
