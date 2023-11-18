import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { filter, map, pipe } from "lodash/fp";

import { QueryKeys } from "@/utils/common/query-keys";
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

  const progresses = pipe(
    filter(([key, value]: [Progress, boolean]) => value),
    map(([key]) => key),
  )(Object.entries(progressChecked));

  const { data: milestoneListData } = useQuery(
    QueryKeys.getAllMilestones(progresses, project?.id),
    () =>
      getAllMilestonesV2({
        progresses,
        projectId: project?.id,
      }),
    {
      enabled: !!project?.id,
      onSuccess: ({ items: milestones }) => {
        if (milestones.length === 0) setCurrentMilestoneId(null);
        if (currentMilestoneId) {
          const hasCurrnetMilestone = milestones.some(
            (milestone) => milestone.id === currentMilestoneId,
          );
          setCurrentMilestoneId(
            hasCurrnetMilestone ? currentMilestoneId : milestones[0].id,
          );
        } else {
          setCurrentMilestoneId(milestones[0].id);
        }
      },
      onError: console.error,
    },
  );

  if (!milestoneListData) return <></>;

  const milestones = milestoneListData.items;

  return (
    <div className="flex flex-col gap-8px">
      {milestones.map((milestone) => (
        <MilestoneListCard
          key={milestone.id}
          milestone={milestone}
          isActive={milestone.id === currentMilestoneId}
          onClick={() => setCurrentMilestoneId(milestone.id)}
        />
      ))}
    </div>
  );
}
