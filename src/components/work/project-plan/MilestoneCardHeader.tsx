import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import React, { useState } from "react";

interface MilestoneCardHeaderProps {
  milestone: Milestone;
  toggleOpened?: boolean;
}
export default function MilestoneCardHeader({
  milestone,
  toggleOpened = true,
}: MilestoneCardHeaderProps) {
  const { id, title, priority } = milestone;

  const [tempTitle, setTempTitle] = useState(() => title ?? "");
  const [editing, setEditing] = useState(false);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(id);

  const resetTitle = () => setTempTitle(title ?? "");

  const handleEdit = () => {
    if (editing) {
      updateMilestoneRequest({ title: tempTitle });
      setEditing(false);
    } else {
      setEditing(true);
    }
    resetTitle();
  };

  return (
    <div
      className={`flex duration-200 ${
        toggleOpened ? "flex-col items-start gap-8px" : "items-center gap-8px"
      }`}
    >
      <ProjectMilestoneEmoji
        milestone={milestone}
        className={`duration-200 ${toggleOpened ? "text-32px" : "text-22px"}`}
      />
      <div className="flex w-full items-center gap-8px">
        {editing ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="이름을 설정해주세요"
            className="max-w-[300px] grow rounded-md border border-gray-200 px-12px py-6px text-16px font-semibold text-gray-700"
          />
        ) : (
          <p
            className={`font-bold leading-[150%] text-gray-700 duration-200 ${
              toggleOpened ? "text-22px" : "text-16px"
            }`}
          >
            {title}
          </p>
        )}

        {toggleOpened && (
          <MilestoneEditButton
            onClick={handleEdit}
            w={24}
            className="text-14px"
            tooltipPlacement="right"
          />
        )}
        {priority === 5 && (
          <div className="rounded-full border border-red-500 px-8px py-4px text-12px text-red-500">
            긴급
          </div>
        )}
      </div>
    </div>
  );
}
