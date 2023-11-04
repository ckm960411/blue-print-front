import { useRecoilValue } from "recoil";
import { useDisclosure } from "@chakra-ui/hooks";
import { format } from "date-fns";

import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { Milestone } from "@/utils/types/milestone";
import CalendarModal from "@/components/work/components/CalendarModal";

interface MilestoneStartAtFormProps {
  milestone: Milestone;
}
export default function MilestoneStartAtForm({
  milestone,
}: MilestoneStartAtFormProps) {
  const { id, startAt, endAt } = milestone;
  const { openToast } = useToastMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const project = useRecoilValue(projectState);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(id, {
    onError: () => {
      openToast({
        status: "error",
        title: "문제 발생",
        description: "시작일 수정 중 문제가 발생했습니다.",
      });
    },
  });

  return (
    <>
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          시작일
        </p>
        <button
          onClick={onOpen}
          className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
        >
          {startAt
            ? format(
                new Date(startAt),
                `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(startAt)})`,
              )
            : "클릭하여 설정해주세요"}
        </button>

        <CalendarModal
          isOpen={isOpen}
          date={startAt}
          onClose={onClose}
          onUpdate={(startAt) =>
            updateMilestoneRequest({ startAt, projectId: project?.id })
          }
          maxDate={endAt}
        />
      </div>
    </>
  );
}
