import React, { useState } from "react";
import NextLink from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

import { Link } from "@/utils/types";
import { useCreateLinkMutation } from "@/utils/hooks/react-query/useCreateLinkMutation";
import { useDeleteLinkMutation } from "@/utils/hooks/react-query/useDeleteLinkMutation";

import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";

interface LinkFormProps {
  parentType: "milestone" | "task";
  parentId: number;
  links: Link[];
}
export default function LinkForm({
  parentType,
  parentId,
  links,
}: LinkFormProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [href, setHref] = useState("");

  const { mutate: createLink } = useCreateLinkMutation(parentType, parentId);
  const { mutate: deleteLink } = useDeleteLinkMutation(parentType, parentId);

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

    createLink({ name, href });
    handleClose();
  };

  return (
    <div className="flex items-start gap-8px">
      <p className="truncate-1-lines basis-[20%] text-14px font-medium text-gray-600">
        링크
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          <div className="flex items-start gap-16px">
            {links && links.length > 0 && (
              <div className="flex flex-col items-start gap-12px">
                {links.map((link) => (
                  <div key={link.id} className="flex items-center gap-6px">
                    <NextLink
                      href={link.href}
                      target="_blank"
                      className="text-14px text-blue-600 underline"
                    >
                      {link.name}
                    </NextLink>
                    <button
                      onClick={() => deleteLink(link.id)}
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
