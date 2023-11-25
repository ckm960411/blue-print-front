import { milestoneKeys, taskKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { createLink } from "@/utils/services/link";
import { CreateLinkReqDto } from "@/utils/services/link/dto/create-link.req.dto";
import { Milestone } from "@/utils/types/milestone";
import { Task } from "@/utils/types/task";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useCreateLinkMutation = (
  parentType: "milestone" | "task",
  parentId: number,
) => {
  const { openToast } = useToastMessage();
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);

  const matchingIdOrUndefined = (type: "milestone" | "task") => {
    return type === parentType ? parentId : undefined;
  };

  return useMutation(
    ["create-link"],
    ({ name, href }: CreateLinkReqDto) => {
      return createLink({
        milestoneId: matchingIdOrUndefined("milestone"),
        taskId: matchingIdOrUndefined("task"),
        name,
        href,
      });
    },
    {
      onSuccess: (newLink) => {
        switch (parentType) {
          case "milestone":
            queryClient.invalidateQueries(milestoneKeys.list(project?.id));
            queryClient.setQueryData<Milestone | undefined>(
              milestoneKeys.detail(parentId, project?.id),
              (prev) => {
                return prev
                  ? { ...prev, links: [...(prev.links ?? []), newLink] }
                  : undefined;
              },
            );
            break;
          case "task":
            queryClient.setQueryData<Task | undefined>(
              taskKeys.detail({ taskId: parentId, projectId: project?.id }),
              (prev) => {
                if (!prev) return prev;
                return { ...prev, links: [...prev.links, newLink] };
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
            e?.response?.data?.message || "링크 생성 중 문제가 발생했습니다.",
        });
      },
    },
  );
};
