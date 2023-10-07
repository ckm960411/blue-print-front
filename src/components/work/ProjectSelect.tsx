"use client";

import React, { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

const projects = ["프로젝트1", "프로젝트2", "프로젝트3", "프로젝트4"];

interface ProjectSelectProps {}
export default function ProjectSelect({}: ProjectSelectProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const [project, setProject] = useState(projects[0]);

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
        <span className="truncate-1-lines w-100px text-left text-14px">
          {project}
        </span>
        <FiChevronDown />
      </button>
      {dropdownOpened && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-[calc(100%+8px)] w-200px rounded-10px border border-gray-200 bg-white py-8px shadow-md"
        >
          {projects.map((prj, i) => {
            return (
              <div
                key={i}
                onClick={() => handleClick(prj)}
                className={`w-full cursor-pointer p-8px text-14px hover:bg-gray-50 ${
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
