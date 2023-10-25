import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMilestones } from "@/utils/services/milestone";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const useMilestonesQuery = (status?: MilestoneStatus) => {
  const project = useRecoilValue(projectState);

  const queryResult = useQuery(
    QueryKeys.getAllMilestones(status, project?.id),
    () =>
      getAllMilestones({
        progress: status === "ALL" ? undefined : status,
        projectId: project?.id,
      }),
    { onError: console.error },
  );

  return queryResult;
};
