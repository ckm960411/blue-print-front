import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { filter, map, pipe } from "lodash/fp";

import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestonesV2 } from "@/utils/services/milestone";
import { Progress } from "@/utils/types";

import MilestoneDetail from "@/components/work/milestone/MilestoneDetail";
import MilestoneList from "@/components/work/milestone/MilestoneList";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";

interface MilestoneTabContentProps {
  progressChecked: ProgressChecked;
}
export default function MilestoneTabContent({
  progressChecked,
}: Readonly<MilestoneTabContentProps>) {
  const [currentMilestoneId, setCurrentMilestoneId] = useState<number | null>(
    null,
  );

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
    <div className="mt-16px grid grid-cols-3 gap-12px">
      <div className="col-span-1 max-h-[720px] overflow-y-auto">
        <MilestoneList
          milestones={milestones}
          currentMilestoneId={currentMilestoneId}
          setCurrentMilestoneId={setCurrentMilestoneId}
        />
      </div>
      <div className="col-span-2 min-h-[720px] overflow-y-auto px-4px pb-4px">
        {currentMilestoneId && (
          <MilestoneDetail milestoneId={currentMilestoneId} />
        )}
      </div>
    </div>
  );
}
