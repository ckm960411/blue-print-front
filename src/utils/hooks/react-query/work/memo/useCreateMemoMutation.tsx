import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";

import { memoKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import { projectState } from "@/utils/recoil/store";
import { createMemo } from "@/utils/services/memo";
import { CreateMemoReqDto } from "@/utils/services/memo/dto/create-memo.req.dto";
import { Memo } from "@/utils/types/memo";

export const useCreateMemoMutation = ({
  milestoneId,
  onSuccess,
  onError,
}: {
  milestoneId?: number;
  onSuccess?: (data?: Memo) => void;
  onError?: (e?: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);
  const { showMemoChecked: showChecked } = useToggleMemoChecked();

  return useMutation(
    ["create-memo-form"],
    async (data: CreateMemoReqDto) => createMemo(data),
    {
      onSuccess: (newMemo) => {
        queryClient.setQueryData<Memo[] | undefined>(
          memoKeys.list({ milestoneId, projectId: project?.id, showChecked }),
          (prev) => {
            if (!prev) return prev;
            return [newMemo, ...prev];
          },
        );
        openToast({ title: "메모 작성 완료" });
        onSuccess?.();
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "메모 작성 실패",
          description: "메모 작성 중 에러가 발생했습니다.",
        });
        onError?.(e);
      },
    },
  );
};
