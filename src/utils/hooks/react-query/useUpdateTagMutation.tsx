import { milestoneKeys, taskKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { updateTag } from "@/utils/services/tag";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";
import { Milestone } from "@/utils/types/milestone";
import { Task } from "@/utils/types/task";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useUpdateTagMutation = ({
  parentType,
  parentId,
  tagId,
}: {
  parentType: "milestone" | "task";
  parentId: number;
  tagId?: number;
}) => {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);

  return useMutation(
    ["update-tag"],
    (data: Partial<CreateTagReqDto>) => updateTag(tagId!, data),
    {
      onSuccess: (patchedTag) => {
        switch (parentType) {
          case "milestone":
            queryClient.setQueryData<Milestone[] | undefined>(
              milestoneKeys.list(project?.id),
              (prev) => {
                if (prev) {
                  return prev.map((milestone) =>
                    milestone.id === parentId
                      ? {
                          ...milestone,
                          tags: milestone.tags.map((tag) =>
                            tag.id === patchedTag.id ? patchedTag : tag,
                          ),
                        }
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
                  ? {
                      ...prev,
                      tags: prev.tags.map((tag) =>
                        tag.id === patchedTag.id ? patchedTag : tag,
                      ),
                    }
                  : undefined;
              },
            );
            break;
          case "task":
            queryClient.setQueryData<Task | undefined>(
              taskKeys.detail({ taskId: parentId, projectId: project?.id }),
              (prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  tags: prev.tags.map((tag) =>
                    tag.id === patchedTag.id ? patchedTag : tag,
                  ),
                };
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
