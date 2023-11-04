import React, { useState } from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsTrash } from "react-icons/bs";

import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { CreateLinkReqDto } from "@/utils/services/link/dto/create-link.req.dto";
import { createLink, deleteLinkById } from "@/utils/services/link";
import { Task } from "@/utils/types/task";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";

interface TaskLinksFormProps {
  task: Task;
}
export default function TaskLinksForm({ task }: TaskLinksFormProps) {
  const { id, links } = task;
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [href, setHref] = useState("");

  const { mutate: createLinkRequest } = useMutation(
    ["create-link"],
    ({ name, href }: CreateLinkReqDto) =>
      createLink({ taskId: id, name, href }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message || "링크 생성 중 문제가 발생했습니다.",
        });
      },
    },
  );

  const { mutate: deleteLinkRequest } = useMutation(
    ["delete-link"],
    (id: number) => deleteLinkById(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message || "링크 삭제 중 문제가 발생했습니다.",
        });
      },
    },
  );

  const resetState = () => {
    setName("");
    setHref("");
  };

  const handleOpen = () => setEditing(true);
  const handleClose = () => {
    resetState();
    setEditing(false);
  };

  const handleConfirm = () => {
    if (!name.trim() || !href.trim()) return;

    createLinkRequest({ name, href });
    handleClose();
  };

  return (
    <div className="flex items-start gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        링크
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          <div className="flex items-start gap-16px">
            {links && links.length > 0 && (
              <div className="flex flex-col items-start gap-12px">
                {links.map((link) => (
                  <div key={link.id} className="flex items-center gap-6px">
                    <Link
                      href={link.href}
                      target="_blank"
                      className="text-14px text-blue-600 underline"
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => deleteLinkRequest(link.id)}
                      className="h-16px w-16px"
                    >
                      <BsTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <MilestoneEditButton
              w={24}
              onClick={handleOpen}
              className="text-14px"
              tooltipPlacement="right-start"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-240px p-16px">
          <div className="flex flex-col gap-16px text-14px">
            <div className="flex items-center gap-8px">
              <p className="flex-shrink-0 text-gray-600">이름:</p>
              <input
                value={name}
                placeholder="링크 이름 입력"
                onChange={(e) => setName(e.target.value)}
                className="grow"
              />
            </div>
            <div className="flex items-center gap-8px">
              <p className="flex-shrink-0 text-gray-600">링크:</p>
              <input
                value={href}
                placeholder="링크 주소 입력"
                onChange={(e) => setHref(e.target.value)}
                className="grow"
              />
            </div>
            <div className="flex items-center justify-end gap-8px">
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
