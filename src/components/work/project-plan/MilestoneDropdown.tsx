"use client";

import React, { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

enum MilestoneStatus {
  ALL = "ALL",
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
interface MilestoneDropdownProps {}
export default function MilestoneDropdown({}: MilestoneDropdownProps) {
  const { ALL, TO_DO, IN_PROGRESS, DONE } = MilestoneStatus;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<MilestoneStatus>(ALL);

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  useOnClickOutside(dropdownRef, closeDropdown);

  const milestones = Object.keys(MilestoneStatus) as MilestoneStatus[];
  const getKoreanMilestoneStatus = (milestone: MilestoneStatus) => {
    return {
      ALL: "전체보기",
      TO_DO: "시작 전",
      IN_PROGRESS: "진행 중",
      DONE: "완료",
    }[milestone];
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
          className="absolute left-0 top-[calc(100%+8px)] z-10 max-h-[138px] w-102px overflow-y-scroll rounded-10px border border-gray-200 bg-white py-8px shadow-md"
        >
          {milestones.map((milestoneStatus) => {
            return (
              <div
                key={milestoneStatus}
                onClick={() => handleClick(milestoneStatus)}
                className={`w-full cursor-pointer bg-white p-8px text-14px hover:bg-gray-50 ${
                  status === milestoneStatus ? "bg-gray-50" : "bg-white"
                }`}
              >
                {getKoreanMilestoneStatus(milestoneStatus)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
