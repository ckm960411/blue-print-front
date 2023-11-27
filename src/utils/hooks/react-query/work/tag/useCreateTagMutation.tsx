import { milestoneKeys, taskKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { createTag } from "@/utils/services/tag";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";
import { Milestone } from "@/utils/types/milestone";
import { Task } from "@/utils/types/task";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useCreateTagMutation = ({
  parentType,
  parentId,
  onReset,
}: {
  parentType: "milestone" | "task";
  parentId: number;
  onReset: () => void;
}) => {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);

  return useMutation(
    ["create-tag"],
    (data: CreateTagReqDto) => createTag(data),
    {
      onSuccess: (newTag) => {
        switch (parentType) {
          case "milestone":
            onReset();
            queryClient.setQueryData<Milestone[] | undefined>(
              milestoneKeys.list(project?.id),
              (prev) => {
                if (prev) {
                  return prev.map((milestone) =>
                    milestone.id === parentId
                      ? { ...milestone, tags: [...milestone.tags, newTag] }
                      : milestone,
                  );
                }
                return prev;
              },
            );
            queryClient.setQueryData<Milestone | undefined>(
              milestoneKeys.detail(parentId, project?.id),
              (prev) => {
                return prev
                  ? { ...prev, tags: [...prev.tags, newTag] }
                  : undefined;
              },
            );
            break;
          case "task":
            queryClient.setQueryData<Task | undefined>(
              taskKeys.detail({ taskId: parentId, projectId: project?.id }),
              (prev) => {
                if (!prev) return prev;
                return { ...prev, tags: [...prev.tags, newTag] };
              },
            );
            break;
          default:
            break;
        }
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message ||
            "문제가 발생했습니다. 다시 시도해주세요.",
        });
      },
    },
  );
};
