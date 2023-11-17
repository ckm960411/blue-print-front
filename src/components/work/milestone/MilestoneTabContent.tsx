import MilestoneDetail from "@/components/work/milestone/MilestoneDetail";
import MilestoneList from "@/components/work/milestone/MilestoneList";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestones } from "@/utils/services/milestone";
import { Milestone } from "@/utils/types/milestone";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface MilestoneTabContentProps {
  progressChecked: ProgressChecked;
}
export default function MilestoneTabContent({
  progressChecked,
}: Readonly<MilestoneTabContentProps>) {
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(
    null,
  );

  const project = useRecoilValue(projectState);

  const { data: milestones = [] } = useQuery(
    QueryKeys.getAllMilestones(undefined, project?.id),
    () =>
      getAllMilestones({
        progress: undefined,
        projectId: project?.id,
      }),
    { onError: console.error },
  );

  return (
    <div className="mt-16px grid grid-cols-3 gap-12px">
      <div className="col-span-1 max-h-[720px] overflow-y-auto">
        <MilestoneList
          milestones={milestones}
          currentMilestone={currentMilestone}
          setCurrentMilestone={setCurrentMilestone}
        />
      </div>
      <div className="col-span-2 min-h-[720px] overflow-y-auto px-4px pb-4px">
        <MilestoneDetail milestone={currentMilestone} />
      </div>
    </div>
  );
}
