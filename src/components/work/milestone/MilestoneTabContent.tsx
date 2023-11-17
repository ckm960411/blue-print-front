import MilestoneDetail from "@/components/work/milestone/MilestoneDetail";
import MilestoneList from "@/components/work/milestone/MilestoneList";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestones } from "@/utils/services/milestone";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface MilestoneTabContentProps {
  progressChecked: ProgressChecked;
}
export default function MilestoneTabContent({
  progressChecked,
}: Readonly<MilestoneTabContentProps>) {
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
    <div className="mt-16px grid grid-cols-3 gap-16px">
      <div className="col-span-1">
        <MilestoneList milestones={milestones} />
      </div>
      <div className="col-span-2">
        <MilestoneDetail />
      </div>
    </div>
  );
}
