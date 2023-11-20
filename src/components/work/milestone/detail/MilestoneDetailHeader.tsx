import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import { Colors } from "@/utils/common/color";
import { getRemainDaysText } from "@/utils/common/etc/getRemainDaysText";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { Milestone } from "@/utils/types/milestone";
import React, { useState } from "react";
import { HiLink } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";

interface MilestoneDetailHeaderProps {
  milestone: Milestone;
}
export default function MilestoneDetailHeader({
  milestone,
}: Readonly<MilestoneDetailHeaderProps>) {
  const project = useRecoilValue(projectState);

  const [tempTitle, setTempTitle] = useState(() => milestone.title ?? "");
  const [editing, setEditing] = useState(false);

  const remainDaysData = getRemainDaysText(milestone.endAt);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
  );

  const resetTitle = () => setTempTitle(milestone.title ?? "");

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
    <div>
      {milestone.classification && (
        <div>
          <button
            className="rounded-md px-8px py-4px text-14px font-semibold"
            style={{
              backgroundColor: Colors[milestone.color][100],
              color: Colors[milestone.color][500],
            }}
          >
            {milestone.classification}
          </button>
        </div>
      )}
      <div className="mt-16px flex items-start gap-8px">
        <ProjectMilestoneEmoji milestone={milestone} canEdit />
        {editing ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="이름을 설정해주세요"
            className="max-w-[300px] grow rounded-md border border-gray-200 px-12px py-6px text-16px font-semibold text-gray-700"
          />
        ) : (
          <div className="flex items-center gap-8px">
            <p className="text-28px font-bold">{milestone.title}</p>
          </div>
        )}
        <MilestoneEditButton
          onClick={handleEdit}
          w={24}
          className="text-14px"
          tooltipPlacement="right"
        />
      </div>
      <div className="flex items-center gap-32px border-b border-gray-200 py-24px">
        {remainDaysData && (
          <div
            className={`flex-center gap-6px text-12px ${
              remainDaysData.remainDays <= 2
                ? "font-medium text-red-500"
                : "text-gray-600"
            }`}
          >
            <IoCalendarClearOutline />
            <span>{remainDaysData.remainDaysText}</span>
          </div>
        )}
        {milestone.links.length > 0 && (
          <div className="flex-center gap-4px text-14px text-gray-600">
            <HiLink />
            <span>{milestone.links.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
