import MilestoneDetail from "@/components/work/milestone/MilestoneDetail";
import MilestoneList from "@/components/work/milestone/MilestoneList";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestonesV2 } from "@/utils/services/milestone";
import { Progress } from "@/utils/types";
import { filter, map, pipe } from "lodash/fp";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

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

  const { data: milestones = [] } = useQuery(
    QueryKeys.getAllMilestones(progresses, project?.id),
    () =>
      getAllMilestonesV2({
        progresses,
        projectId: project?.id,
      }),
    { onError: console.error },
  );

  useEffect(() => {
    if (!currentMilestoneId) {
      setCurrentMilestoneId(milestones[0]?.id ?? null);
    }
  }, [milestones]);

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
