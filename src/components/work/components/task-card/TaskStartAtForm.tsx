import CalendarModal from "@/components/work/components/CalendarModal";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Task } from "@/utils/types/task";
import { useDisclosure } from "@chakra-ui/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { format, startOfDay } from "date-fns";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

interface TaskStartAtFormProps {
  task: Task;
}
export default function TaskStartAtForm({ task }: TaskStartAtFormProps) {
  const { id, startAt, endAt } = task;
  const toast = useRef<Toast>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
    },
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
                startOfDay(new Date(startAt)),
                `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(startAt)})`,
              )
            : "클릭하여 설정해주세요"}
        </button>

        <CalendarModal
          isOpen={isOpen}
          date={startAt}
          onClose={onClose}
          onUpdate={(startAt) =>
            updateTaskRequest({ startAt, projectId: project?.id })
          }
          maxDate={endAt}
        />
      </div>
    </>
  );
}
