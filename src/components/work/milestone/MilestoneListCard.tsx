import { projectState } from "@/utils/recoil/store";
import React from "react";
import { useQueryClient } from "react-query";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FaRegStickyNote } from "react-icons/fa";
import { GrTask } from "react-icons/gr";

import { Colors } from "@/utils/common/color";
import { getRemainDaysText } from "@/utils/common/etc/getRemainDaysText";
import { milestoneKeys, QueryKeys } from "@/utils/common/query-keys";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone, MilestoneWithContentCount } from "@/utils/types/milestone";

import IconButton from "@/components/components/IconButton";
import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import { useRecoilValue } from "recoil";

interface MilestoneListCardProps {
  milestone: MilestoneWithContentCount;
  isActive: boolean;
  onClick?: () => void;
}
export default function MilestoneListCard({
  milestone,
  isActive,
  onClick,
}: Readonly<MilestoneListCardProps>) {
  const project = useRecoilValue(projectState);
  const remainDaysData = getRemainDaysText(milestone.endAt);
  const queryClient = useQueryClient();

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllMilestones());
        queryClient.setQueryData<Milestone | undefined>(
          milestoneKeys.detail(milestone.id, project?.id),
          (prev) => {
            return prev
              ? { ...prev, isBookmarked: !prev.isBookmarked }
              : undefined;
          },
        );
      },
      onError: console.error,
    },
  );

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="cursor-pointer rounded-md border p-8px duration-200 hover:shadow-md"
      style={{
        borderColor: isActive ? Colors[milestone.color][500] : Colors.gray[200],
      }}
    >
      <div className="flex flex-col gap-8px">
        <div className="flex items-center gap-8px">
          <div className="grow">
            <div
              className="inline rounded-md p-4px text-12px font-medium"
              style={{
                backgroundColor: Colors[milestone.color][50],
                color: Colors[milestone.color][500],
              }}
            >
              {milestone.classification ?? "분류 추가"}
            </div>
          </div>
          <IconButton
            w={24}
            onClick={(e) => {
              e?.stopPropagation();
              updateMilestoneRequest({ isBookmarked: !milestone.isBookmarked });
            }}
          >
            {milestone.isBookmarked ? (
              <BsFillBookmarkFill className="text-14px text-red-500" />
            ) : (
              <BsBookmark className="text-14px" />
            )}
          </IconButton>
        </div>
        <div className="flex items-center gap-4px">
          <div className="inline-flex items-center gap-6px rounded-full border border-gray-200 px-6px py-4px text-16px">
            <CiStar />
            <span className="text-12px font-medium">{milestone.priority}</span>
          </div>
          <ProjectMilestoneEmoji milestone={milestone} className="text-14px" />
          <p className="truncate-1-lines text-16px font-semibold">
            {milestone.title}
          </p>
        </div>
        <div className="flex items-center gap-8px">
          <div className="grow">
            {remainDaysData && (
              <p
                className={`text-12px ${
                  remainDaysData.remainDays <= 2
                    ? "font-medium text-red-500"
                    : "text-gray-600"
                }`}
              >
                {remainDaysData.remainDaysText}
              </p>
            )}
          </div>
          <div className="flex flex-shrink-0 items-center gap-4px">
            <div className="inline-flex items-center gap-6px rounded-full border border-gray-200 px-6px py-4px text-16px">
              <GrTask className="text-10px" />
              <span className="text-12px font-medium">
                {milestone.taskCount}
              </span>
            </div>
            <div className="inline-flex items-center gap-6px rounded-full border border-gray-200 px-6px py-4px text-16px">
              <FaRegStickyNote className="text-12px" />
              <span className="text-10px font-medium">
                {milestone.memoCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
