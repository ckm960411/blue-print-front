import MilestoneColorForm from "@/components/work/project-plan/MilestoneColorForm";
import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { Milestone } from "@/utils/types/milestone";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface MilestoneCardHeaderProps {
  milestone: Milestone;
  toggleOpened?: boolean;
}
export default function MilestoneCardHeader({
  milestone,
  toggleOpened = true,
}: MilestoneCardHeaderProps) {
  const { id, title, priority } = milestone;
  const project = useRecoilValue(projectState);

  const [tempTitle, setTempTitle] = useState(() => title ?? "");
  const [editing, setEditing] = useState(false);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(id);

  const resetTitle = () => setTempTitle(title ?? "");

  const handleEdit = () => {
    if (editing) {
      updateMilestoneRequest({ title: tempTitle, projectId: project?.id });
      setEditing(false);
    } else {
      setEditing(true);
    }
    resetTitle();
  };

  return (
    <div
      className={`flex grow duration-200 ${
        toggleOpened ? "flex-col items-start gap-8px" : "items-center gap-8px"
      }`}
    >
      <ProjectMilestoneEmoji
        milestone={milestone}
        className={`duration-200 ${toggleOpened ? "text-32px" : "text-22px"}`}
        canEdit={toggleOpened}
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
          <div className="flex items-center gap-8px">
            {toggleOpened && <MilestoneColorForm milestone={milestone} />}
            <p
              className={`truncate-1-lines font-bold leading-[150%] text-gray-700 duration-200 ${
                toggleOpened ? "text-22px" : "text-16px"
              }`}
            >
              {title}
            </p>
          </div>
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
