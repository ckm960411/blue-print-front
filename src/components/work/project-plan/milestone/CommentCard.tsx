import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";
import DropdownMenu from "@/components/work/components/task-card/DropdownMenu";
import VerticalDotsButton from "@/components/work/components/VerticalDotsButton";
import CommentCardCheck from "@/components/work/project-plan/milestone/CommentCardCheck";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateCommentMutation } from "@/utils/hooks/react-query/useUpdateCommentMutation";
import { Comment } from "@/utils/types/comment";
import { useDisclosure } from "@chakra-ui/hooks";
import { format } from "date-fns";
import React from "react";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import { useBoolean } from "usehooks-ts";

interface CommentCardProps {
  comment: Comment;
}
export default function CommentCard({ comment }: CommentCardProps) {
  const { openToast } = useToastMessage();

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const { mutate: updateCommentRequest } = useUpdateCommentMutation(
    comment.id,
    {
      onError: (e) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message || "댓글 수정 중 문제가 발생했습니다.",
        });
      },
    },
  );

  const handleUpdate = () => {
    closeDropdown();
  };

  const handleDelete = () => {
    closeDropdown();
    openDeletePopup();
  };

  const menus = [
    {
      title: "수정하기",
      icon: <BsPencil />,
      onClick: handleUpdate,
    },
    {
      title: "삭제하기",
      icon: <BsTrash />,
      onClick: handleDelete,
    },
  ];

  return (
    <div
      key={comment.id}
      className="relative flex flex-col gap-12px rounded-10px p-16px shadow-md duration-200 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="text-14px font-bold">댓글</div>
        <div className="relative flex flex-shrink-0 items-center justify-end gap-8px">
          <CommentCardCheck
            commentId={comment.id}
            isChecked={comment.isChecked}
          />
          <IconButton
            onClick={() => {
              updateCommentRequest({ isBookmarked: !comment.isBookmarked });
            }}
            className="rounded-md bg-transparent text-16px hover:bg-transparent"
            w={24}
          >
            {comment.isBookmarked ? (
              <BsFillBookmarkFill className="text-red-500" />
            ) : (
              <BsBookmark className="text-gray-800" />
            )}
          </IconButton>
          <VerticalDotsButton onClick={openDropdown} />

          <DropdownMenu
            open={dropdownOpened}
            menus={menus}
            onClose={closeDropdown}
          />
          <DeletePopup
            open={isDeletePopupOpen}
            title="정말 이 프로젝트를 삭제할까요?"
            onClose={closeDeletePopup}
            onComplete={() => {}}
          />
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: comment.content }}
        className="grow break-all text-14px leading-[140%] text-gray-800"
      />
      <p className="text-12px font-medium text-gray-600">
        {format(new Date(comment.createdAt), "yyyy.MM.dd HH:mm")}
      </p>
    </div>
  );
}
