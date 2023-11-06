import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllTask } from "@/utils/services/task";
import { Progress } from "@/utils/types";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export const useTasksQuery = (
  props?: { progress?: Progress; milestoneId?: number },
  options?: { onError?: (e: any) => void },
) => {
  const project = useRecoilValue(projectState);

  const queryResult = useQuery(
    QueryKeys.getAllTasks(props?.progress, props?.milestoneId, project?.id),
    () =>
      getAllTask({
        progress: props?.progress,
        milestoneId: props?.milestoneId,
        projectId: project?.id,
      }),
    {
      onError: options?.onError,
    },
  );

  return queryResult;
};
