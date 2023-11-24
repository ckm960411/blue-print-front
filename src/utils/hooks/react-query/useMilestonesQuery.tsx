import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import { milestoneKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestones } from "@/utils/services/milestone";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export const useMilestonesQuery = (status?: MilestoneStatus) => {
  const project = useRecoilValue(projectState);

  return useQuery(
    [...milestoneKeys.list(project?.id), status],
    () =>
      getAllMilestones({
        progress: status === "ALL" ? undefined : status,
        projectId: project?.id,
      }),
    { onError: console.error },
  );
};
