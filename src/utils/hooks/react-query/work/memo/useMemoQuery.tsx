import { memoKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import { projectState } from "@/utils/recoil/store";
import { getAllMemos } from "@/utils/services/memo";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export const useMemoQuery = (options?: { milestoneId?: number }) => {
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);

  const { showMemoChecked: showChecked } = useToggleMemoChecked();

  return useQuery(
    memoKeys.list({
      projectId: project?.id,
      milestoneId: options?.milestoneId,
      showChecked,
    }),
    () =>
      getAllMemos({
        checked: showChecked,
        milestoneId: options?.milestoneId,
        projectId: project?.id,
      }),
    {
      onError: () =>
        openToast({
          status: "error",
          title: "에러 발생",
          description: "메모를 불러오던 중 문제가 발생했습니다.",
        }),
    },
  );
};
