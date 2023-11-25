import { QueryKeys } from "@/utils/common/query-keys";
import { createMemo } from "@/utils/services/memo";
import { CreateMemoReqDto } from "@/utils/services/memo/dto/create-memo.req.dto";
import { Memo } from "@/utils/types/memo";
import { useMutation, useQueryClient } from "react-query";

export const useCreateMemoMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data?: Memo) => void;
  onError?: (e?: unknown) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["create-memo-form"],
    async (data: CreateMemoReqDto) => createMemo(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllMemos());
        onSuccess?.();
      },
      onError,
    },
  );
};
