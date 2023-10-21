import CalendarModal from "@/components/work/components/CalendarModal";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import { useDisclosure } from "@chakra-ui/hooks";
import { format } from "date-fns";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface MilestoneStartAtFormProps {
  milestone: Milestone;
}
export default function MilestoneStartAtForm({
  milestone,
}: MilestoneStartAtFormProps) {
  const { id, startAt, endAt } = milestone;
  const toast = useRef<Toast>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(id, {
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: "문제 발생",
        detail: "시작일 수정 중 문제가 발생했습니다.",
      });
    },
  });

  return (
    <>
      <Toast ref={toast} />
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
          onUpdate={(startAt) => updateMilestoneRequest({ startAt })}
          maxDate={endAt}
        />
      </div>
    </>
  );
}
