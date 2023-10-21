import CalendarModal from "@/components/work/components/CalendarModal";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import { useDisclosure } from "@chakra-ui/hooks";
import { format } from "date-fns";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface MilestoneEndAtFormProps {
  milestone: Milestone;
}
export default function MilestoneEndAtForm({
  milestone,
}: MilestoneEndAtFormProps) {
  const { id, startAt, endAt } = milestone;
  const toast = useRef<Toast>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(id, {
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: "문제 발생",
        detail: "종료일 수정 중 문제가 발생했습니다.",
      });
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          종료일
        </p>
        <button
          onClick={onOpen}
          className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
        >
          {endAt
            ? format(
                new Date(endAt),
                `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(endAt)})`,
              )
            : "클릭하여 설정해주세요"}
        </button>

        <CalendarModal
          isOpen={isOpen}
          date={endAt}
          onClose={onClose}
          onUpdate={(endAt) => updateMilestoneRequest({ endAt })}
          minDate={startAt}
        />
      </div>
    </>
  );
}
