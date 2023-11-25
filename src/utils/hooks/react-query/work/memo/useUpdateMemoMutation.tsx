import { memoKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { updateMemo, UpdateMemoReqDto } from "@/utils/services/memo";
import { Memo } from "@/utils/types/memo";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

export const useUpdateMemoMutation = ({
  memoId,
  milestoneId,
}: {
  memoId: number | undefined;
  milestoneId?: number;
}) => {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);

  return useMutation(
    ["update-memo"],
    (updateMemoReqDto: UpdateMemoReqDto) => {
      if (!memoId) return Promise.reject("no memo id");
      return updateMemo(memoId, updateMemoReqDto);
    },
    {
      onSuccess: (patchedMemo) => {
        queryClient.setQueryData<Memo[] | undefined>(
          memoKeys.list({ milestoneId, projectId: project?.id }),
          (prev) => {
            if (!prev) return prev;
            return prev.map((memo) =>
              memo.id === patchedMemo?.id ? patchedMemo : memo,
            );
          },
        );
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message ||
            "메모 업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
        });
      },
    },
  );
};
