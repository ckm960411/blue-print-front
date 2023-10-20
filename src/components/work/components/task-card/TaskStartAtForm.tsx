import TaskCalendarModal from "@/components/work/components/task-card/TaskCalendarModal";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { QueryKeys } from "@/utils/common/query-keys";
import { updateTask } from "@/utils/services/task";
import { DateTime } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface TaskStartAtFormProps {
  taskId: number;
  startAt: DateTime | null;
  endAt: DateTime | null;
}
export default function TaskStartAtForm({
  taskId,
  startAt,
  endAt,
}: TaskStartAtFormProps) {
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: updateStartAt } = useMutation(
    ["update-task"],
    (startAt: Date) => updateTask(taskId, { startAt }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
      },
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail: "시작일 수정 중 문제가 발생했습니다.",
        });
      },
    },
  );

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

        <TaskCalendarModal
          isOpen={isOpen}
          date={startAt}
          onClose={onClose}
          onUpdate={updateStartAt}
          maxDate={endAt}
        />
      </div>
    </>
  );
}