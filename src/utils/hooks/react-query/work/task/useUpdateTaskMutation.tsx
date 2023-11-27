import { milestoneKeys, taskKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { updateTask } from "@/utils/services/task";
import { UpdateTaskReqDto } from "@/utils/services/task/dto/update-task.req.dto";
import { Task } from "@/utils/types/task";
import { omit } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useUpdateTaskMutation = (options?: {
  milestoneId?: number;
  onSuccess?: () => void;
  onError?: (e?: any) => void;
}) => {
  const project = useRecoilValue(projectState);
  const queryClient = useQueryClient();

  return useMutation(
    ["update-task"],
    (updateTaskReqDto: UpdateTaskReqDto & { taskId: number }) =>
      updateTask(updateTaskReqDto.taskId, omit(updateTaskReqDto, "taskId")),
    {
      onSuccess: (patchedTask) => {
        queryClient.invalidateQueries(
          taskKeys.list({
            projectId: project?.id,
            milestoneId: options?.milestoneId,
          }),
        );
        queryClient.setQueryData<Task | undefined>(
          taskKeys.detail({ taskId: patchedTask.id, projectId: project?.id }),
          (prev) => {
            if (!prev) return prev;
            return { ...prev, ...patchedTask };
          },
        );
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
        options?.onSuccess?.();
      },
      onError: (e: any) => {
        console.error(e);
        options?.onError?.(e);
      },
    },
  );
};
