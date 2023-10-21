import Link from "next/link";
import React, { useState } from "react";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

export interface MilestoneLink {
  id: number;
  name: string;
  href: string;
}
interface MilestoneLinksFormProps {}
export default function MilestoneLinksForm({}: MilestoneLinksFormProps) {
  const [links, setLinks] = useState<MilestoneLink[]>([]);
  const [editing, setEditing] = useState(false);
  const [tempLinkName, setTempLinkName] = useState("");
  const [tempLinkHref, setTempLinkHref] = useState("");

  const resetState = () => {
    setTempLinkName("");
    setTempLinkHref("");
  };

  const handleOpen = () => setEditing(true);
  const handleClose = () => {
    resetState();
    setEditing(false);
  };

  const handleConfirm = () => {
    // TODO: 링크 추가시 DB 반영후 revalidate 필요

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
            <div className="flex flex-col gap-12px">
              <Link
                href="https://uglyus.co.kr"
                target="_blank"
                className="text-14px text-blue-600 underline"
              >
                노션 기획 문서
              </Link>
              <Link
                href="https://uglyus.co.kr"
                target="_blank"
                className="text-14px text-blue-600 underline"
              >
                피그마
              </Link>
            </div>
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
                value={tempLinkName}
                placeholder="링크 이름 입력"
                onChange={(e) => setTempLinkName(e.target.value)}
                className="grow"
              />
            </div>
            <div className="flex items-center gap-8px">
              <p className="flex-shrink-0 text-gray-600">링크:</p>
              <input
                value={tempLinkHref}
                placeholder="링크 주소 입력"
                onChange={(e) => setTempLinkHref(e.target.value)}
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
