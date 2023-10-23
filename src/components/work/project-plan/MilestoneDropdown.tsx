"use client";

import { Progress } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useOnClickOutside } from "usehooks-ts";

type MilestoneStatus = Progress | "ALL";
interface MilestoneDropdownProps {
  status: MilestoneStatus;
  setStatus: Dispatch<SetStateAction<MilestoneStatus>>;
}
export default function MilestoneDropdown({
  status,
  setStatus,
}: MilestoneDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    isOpen: dropdownOpened,
    onOpen: openDropdown,
    onClose: closeDropdown,
  } = useDisclosure();
  useOnClickOutside(dropdownRef, closeDropdown);

  const milestones: { id: MilestoneStatus; title: string }[] = [
    { id: "ALL", title: "전체보기" },
    { id: Progress.ToDo, title: "시작 전" },
    { id: Progress.InProgress, title: "진행 중" },
    { id: Progress.Review, title: "리뷰 중" },
    { id: Progress.Completed, title: "완료" },
  ];
  const getKoreanMilestoneStatus = (id: MilestoneStatus) => {
    return {
      ALL: "전체보기",
      [Progress.ToDo]: "시작 전",
      [Progress.InProgress]: "진행 중",
      [Progress.Review]: "리뷰 중",
      [Progress.Completed]: "완료",
    }[id];
  };

  const handleClick = (status: MilestoneStatus) => {
    setStatus(status);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={dropdownOpened ? closeDropdown : openDropdown}
        className="flex items-center justify-between gap-8px rounded-10px bg-white p-8px hover:bg-gray-50"
      >
        <span className="truncate-1-lines w-60px text-left text-14px">
          {getKoreanMilestoneStatus(status)}
        </span>
        <FiChevronDown />
      </button>
      {dropdownOpened && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-[calc(100%+8px)] z-10 w-102px overflow-y-scroll rounded-10px border border-gray-200 bg-white py-8px shadow-md"
        >
          {milestones.map(({ id, title }) => {
            return (
              <div
                key={id}
                onClick={() => handleClick(id)}
                className={`w-full cursor-pointer bg-white p-8px text-14px hover:bg-gray-50 ${
                  id === status ? "bg-gray-50" : "bg-white"
                }`}
              >
                {getKoreanMilestoneStatus(id)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
