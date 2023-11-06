import { useRecoilValue } from "recoil";
import { useDisclosure } from "@chakra-ui/hooks";
import { useQueryClient } from "react-query";
import { endOfDay, format } from "date-fns";

import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Task } from "@/utils/types/task";
import CalendarModal from "@/components/work/components/CalendarModal";

interface TaskEndAtFormProps {
  task: Task;
}
export default function TaskEndAtForm({ task }: TaskEndAtFormProps) {
  const { id, startAt, endAt } = task;

  const { openToast } = useToastMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
    },
    onError: (e) => {
      openToast({
        status: "error",
        title: "문제 발생",
        description:
          e?.response?.data?.message || "종료일 수정 중 문제가 발생했습니다.",
      });
    },
  });

  return (
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
              endOfDay(new Date(endAt)),
              `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(endAt)})`,
            )
          : "클릭하여 설정해주세요"}
      </button>

      <CalendarModal
        isOpen={isOpen}
        date={endAt}
        onClose={onClose}
        onUpdate={(endAt) =>
          updateTaskRequest({ endAt, projectId: project?.id })
        }
        minDate={startAt}
      />
    </div>
  );
}
