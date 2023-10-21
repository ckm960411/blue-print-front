import { QueryKeys } from "@/utils/common/query-keys";
import { updateMilestone } from "@/utils/services/milestone";
import { UpdateMilestoneReqDto } from "@/utils/services/milestone/dto/update-milestone.req.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMilestoneMutation = (
  milestoneId: number,
  options?: {
    onSuccess?: () => void;
    onError?: (e?: any) => void;
  },
) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    ["update-milestone"],
    (updateMilestoneReqDto: UpdateMilestoneReqDto) =>
      updateMilestone(milestoneId, updateMilestoneReqDto),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QueryKeys.getAllMilestones());
        options?.onSuccess?.();
      },
      onError: (e: any) => {
        console.error(e);
        options?.onError?.(e);
      },
    },
  );

  return mutationResult;
};
