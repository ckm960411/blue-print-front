"use client";

import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllProjects } from "@/utils/services/project";
import { useQuery } from "@tanstack/react-query";
import { find } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { useMediaQuery } from "react-responsive";

interface ProjectSelectProps {}
export default function ProjectSelect({}: ProjectSelectProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const [project, setProject] = useRecoilState(projectState);
  const UNDER_380PX = useMediaQuery({ query: "(max-width: 379px)" });
  useOnClickOutside(dropdownRef, closeDropdown);

  const { data: projects = [] } = useQuery(
    QueryKeys.getAllProjects(),
    getAllProjects,
    {
      onError: console.error,
    },
  );

  const handleClick = (prjId: number) => {
    const found = find(projects, (project) => project.id === prjId);
    if (found) setProject(found);
    closeDropdown();
  };

  useEffect(() => {
    if (projects.length > 0) setProject(projects[0]);
  }, [projects]);

  if (!project) return <></>;

  return (
    <div className="relative">
      <button
        onClick={dropdownOpened ? closeDropdown : openDropdown}
        className="flex items-center justify-between gap-8px rounded-10px bg-white p-8px hover:bg-gray-50"
      >
        <span className="truncate-1-lines w-100px text-left text-14px">
          {project.title}
        </span>
        <FiChevronDown />
      </button>
      {dropdownOpened && (
        <div
          ref={dropdownRef}
          className={`absolute top-[calc(100%+8px)] z-10 w-200px rounded-10px border border-gray-200 bg-white py-8px shadow-md ${
            UNDER_380PX ? "right-0" : "left-0"
          }`}
        >
          {projects.map((prj, i) => {
            return (
              <div
                key={i}
                onClick={() => handleClick(prj.id)}
                className={`w-full cursor-pointer bg-white p-8px text-14px hover:bg-gray-50 ${
                  prj === project ? "bg-gray-50" : "bg-white"
                }`}
              >
                {prj.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
