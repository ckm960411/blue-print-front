import { milestoneKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getMilestoneById } from "@/utils/services/milestone";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export const useMilestoneByIdQuery = (id: number) => {
  const project = useRecoilValue(projectState);

  return useQuery(
    milestoneKeys.detail(id, project?.id),
    () => getMilestoneById(id),
    { onError: console.error },
  );
};
