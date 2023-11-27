import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";

import { memoKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import { projectState } from "@/utils/recoil/store";
import { deleteMemo } from "@/utils/services/memo";
import { Memo } from "@/utils/types/memo";

export const useDeleteMemoMutation = ({
  memoId,
  milestoneId,
}: {
  memoId: number;
  milestoneId?: number;
}) => {
  const { openToast } = useToastMessage();
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);
  const { showMemoChecked: showChecked } = useToggleMemoChecked();

  return useMutation(["delete-memo"], () => deleteMemo(memoId), {
    onSuccess: (deletedMemo) => {
      queryClient.setQueryData<Memo[] | undefined>(
        memoKeys.list({ milestoneId, projectId: project?.id, showChecked }),
        (prev) => {
          if (!prev) return prev;
          return prev.filter((memo) => memo.id !== deletedMemo.id);
        },
      );
      openToast({
        status: "success",
        title: "메모 삭제 완료",
        description: "메모 삭제가 완료되었습니다.",
      });
    },
    onError: (e: any) => {
      openToast({
        status: "error",
        title: "문제 발생",
        description:
          e?.response?.data?.message ||
          "메모 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.",
      });
    },
  });
};
