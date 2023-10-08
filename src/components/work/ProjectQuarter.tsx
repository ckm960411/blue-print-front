"use client";

import React, { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { useMediaQuery } from "react-responsive";

const projects = ["2023.3Q", "2023.4Q", "2024.1Q", "2024.2Q"];

interface ProjectQuarterProps {}
export default function ProjectQuarter({}: ProjectQuarterProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const [project, setProject] = useState(projects[0]);
  const UNDER_380PX = useMediaQuery({ query: "(max-width: 379px)" });
  useOnClickOutside(dropdownRef, closeDropdown);

  const handleClick = (prj: string) => {
    setProject(prj);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={dropdownOpened ? closeDropdown : openDropdown}
        className="flex items-center justify-between gap-8px rounded-10px bg-white p-8px hover:bg-gray-50"
      >
        <span className="truncate-1-lines w-60px text-left text-14px">
          {project}
        </span>
        <FiChevronDown />
      </button>
      {dropdownOpened && (
        <div
          ref={dropdownRef}
          className={`absolute top-[calc(100%+8px)] z-10 max-h-[138px] w-102px overflow-y-scroll rounded-10px border border-gray-200 bg-white py-8px shadow-md ${
            UNDER_380PX ? "right-0" : "left-0"
          }`}
        >
          {projects.map((prj, i) => {
            return (
              <div
                key={i}
                onClick={() => handleClick(prj)}
                className={`w-full cursor-pointer bg-white p-8px text-14px hover:bg-gray-50 ${
                  prj === project ? "bg-gray-50" : "bg-white"
                }`}
              >
                {prj}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
