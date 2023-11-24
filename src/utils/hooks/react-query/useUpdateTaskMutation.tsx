import { milestoneKeys, QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { updateTask } from "@/utils/services/task";
import { UpdateTaskReqDto } from "@/utils/services/task/dto/update-task.req.dto";
import { omit } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useUpdateTaskMutation = (options?: {
  onSuccess?: () => void;
  onError?: (e?: any) => void;
}) => {
  const project = useRecoilValue(projectState);
  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    ["update-task"],
    (updateTaskReqDto: UpdateTaskReqDto & { taskId: number }) =>
      updateTask(updateTaskReqDto.taskId, omit(updateTaskReqDto, "taskId")),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
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
