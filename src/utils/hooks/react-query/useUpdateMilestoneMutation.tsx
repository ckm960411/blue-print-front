import { milestoneKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { updateMilestone } from "@/utils/services/milestone";
import { UpdateMilestoneReqDto } from "@/utils/services/milestone/dto/update-milestone.req.dto";
import { Milestone } from "@/utils/types/milestone";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useUpdateMilestoneMutation = (
  milestoneId: number,
  options?: {
    onSuccess?: () => void;
    onError?: (e?: any) => void;
  },
) => {
  const project = useRecoilValue(projectState);
  const queryClient = useQueryClient();

  return useMutation(
    ["update-milestone"],
    (updateMilestoneReqDto: UpdateMilestoneReqDto) =>
      updateMilestone(milestoneId, updateMilestoneReqDto),
    {
      onSuccess: (patchedMilestone) => {
        queryClient.setQueryData<Milestone[] | undefined>(
          milestoneKeys.list(project?.id),
          (prev) => {
            if (prev) {
              return prev.map((milestone) =>
                milestone.id === patchedMilestone.id
                  ? patchedMilestone
                  : milestone,
              );
            }
            return prev;
          },
        );
        queryClient.setQueryData<Milestone | undefined>(
          milestoneKeys.detail(milestoneId, project?.id),
          (prev) => (prev ? { ...prev, ...patchedMilestone } : undefined),
        );
        options?.onSuccess?.();
      },
      onError: (e: any) => {
        console.error(e);
        options?.onError?.(e);
      },
    },
  );
};
