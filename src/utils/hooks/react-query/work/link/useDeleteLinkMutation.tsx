import { milestoneKeys, taskKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { deleteLinkById } from "@/utils/services/link";
import { Milestone } from "@/utils/types/milestone";
import { Task } from "@/utils/types/task";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useDeleteLinkMutation = (
  parentType: "milestone" | "task",
  parentId: number,
) => {
  const project = useRecoilValue(projectState);
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();

  return useMutation(["delete-link"], (id: number) => deleteLinkById(id), {
    onSuccess: (deletedLink) => {
      switch (parentType) {
        case "milestone":
          queryClient.invalidateQueries(milestoneKeys.list(project?.id));
          queryClient.setQueryData<Milestone | undefined>(
            milestoneKeys.detail(parentId, project?.id),
            (prev) => {
              return prev
                ? {
                    ...prev,
                    links: prev.links.filter(
                      (link) => link.id !== deletedLink.id,
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
                links: prev.links.filter((link) => link.id !== deletedLink.id),
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
          e?.response?.data?.message || "링크 삭제 중 문제가 발생했습니다.",
      });
    },
  });
};
