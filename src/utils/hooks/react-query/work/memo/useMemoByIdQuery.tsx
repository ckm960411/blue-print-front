import { memoKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { getOneMemoById } from "@/utils/services/memo";
import { useQuery } from "react-query";

export const useMemoByIdQuery = (memoId: number | null) => {
  const { openToast } = useToastMessage();

  return useQuery(
    memoKeys.detail({ memoId }),
    () => {
      if (!memoId) return Promise.reject(new Error("no current memo id"));
      return getOneMemoById(memoId);
    },
    {
      enabled: !!memoId,
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message ||
            "메모를 불러오는 중 문제가 발생했습니다.",
        });
      },
    },
  );
};
