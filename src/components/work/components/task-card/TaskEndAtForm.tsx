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

interface TaskEndAtFormProps {
  taskId: number;
  starAt: DateTime | null;
  endAt: DateTime | null;
}
export default function TaskEndAtForm({
  taskId,
  starAt,
  endAt,
}: TaskEndAtFormProps) {
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: updateStartAt } = useMutation(
    ["update-task"],
    (endAt: Date) => updateTask(taskId, { endAt }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
      },
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail: "종료일 수정 중 문제가 발생했습니다.",
        });
      },
    },
  );

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

        <TaskCalendarModal
          isOpen={isOpen}
          date={endAt}
          onClose={onClose}
          onUpdate={updateStartAt}
          minDate={starAt}
        />
      </div>
    </>
  );
}