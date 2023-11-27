import IconButton from "@/components/components/IconButton";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { filter, map, pipe } from "lodash/fp";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { milestoneKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestonesV2 } from "@/utils/services/milestone";
import { Progress } from "@/utils/types";

import MilestoneListCard from "@/components/work/milestone/MilestoneListCard";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";

interface MilestoneListProps {
  progressChecked: ProgressChecked;
  currentMilestoneId: number | null;
  setCurrentMilestoneId: Dispatch<SetStateAction<number | null>>;
}
export default function MilestoneList({
  progressChecked,
  currentMilestoneId,
  setCurrentMilestoneId,
}: Readonly<MilestoneListProps>) {
  const project = useRecoilValue(projectState);
  const [page, setPage] = useState(1);

  const progresses = pipe(
    filter(([key, value]: [Progress, boolean]) => value),
    map(([key]) => key),
  )(Object.entries(progressChecked));

  const { data: milestoneListData } = useQuery(
    [...milestoneKeys.list(project?.id), progresses, page],
    () =>
      getAllMilestonesV2({
        progresses,
        projectId: project?.id,
        page,
        pageSize: 10,
      }),
    {
      enabled: !!project?.id,
      onSuccess: ({ items: milestones }) => {
        if (milestones.length === 0) return setCurrentMilestoneId(null);
        if (!currentMilestoneId) {
          setCurrentMilestoneId(milestones[0].id);
        }
      },
      onError: console.error,
    },
  );

  if (!milestoneListData) return <></>;

  const { items: milestones, hasPrev, hasNext } = milestoneListData;

  return (
    <div className="flex flex-col gap-8px">
      <div className="flex h-[calc(100vh-260px)] flex-col gap-8px overflow-y-auto">
        {milestones.map((milestone) => (
          <MilestoneListCard
            key={milestone.id}
            milestone={milestone}
            isActive={milestone.id === currentMilestoneId}
            onClick={() => setCurrentMilestoneId(milestone.id)}
          />
        ))}
      </div>
      <div className="flex-center gap-8px">
        <IconButton
          disabled={!hasPrev}
          className="hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300"
          onClick={() => setPage((prev) => prev - 1)}
        >
          <MdOutlineKeyboardArrowLeft />
        </IconButton>
        <div className="min-w-[16px] text-center text-16px font-medium">
          {page}
        </div>
        <IconButton
          disabled={!hasNext}
          className="hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300"
          onClick={() => setPage((prev) => prev + 1)}
        >
          <MdOutlineKeyboardArrowRight />
        </IconButton>
      </div>
    </div>
  );
}
