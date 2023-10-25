import { QueryKeys } from "@/utils/common/query-keys";
import { updateTask } from "@/utils/services/task";
import { UpdateTaskReqDto } from "@/utils/services/task/dto/update-task.req.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTaskMutation = (
  taskId: number,
  options?: {
    onSuccess?: () => void;
    onError?: (e?: any) => void;
  },
) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    ["update-task"],
    (updateTaskReqDto: UpdateTaskReqDto) =>
      updateTask(taskId, updateTaskReqDto),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
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
