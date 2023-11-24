import CalendarModal from "@/components/work/components/CalendarModal";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { DateTime } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/hooks";
import { endOfDay, format, startOfDay } from "date-fns";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface DateFormProps {
  startAt: DateTime | null;
  endAt: DateTime | null;
  dateType: "startAt" | "endAt";
  parentType: "task" | "milestone";
  parentId: number;
}
export default function DateForm({
  startAt,
  endAt,
  dateType,
  parentType,
  parentId,
}: DateFormProps) {
  const { openToast } = useToastMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);

  const isStartAt = dateType === "startAt";
  const date = isStartAt ? startAt : endAt;

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
    },
    onError: (e) => {
      openToast({
        status: "error",
        title: "문제 발생",
        description:
          e?.response?.data?.message || "시작일 수정 중 문제가 발생했습니다.",
      });
    },
  });

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    parentId,
    {
      onError: () => {
        openToast({
          status: "error",
          title: "문제 발생",
          description: "시작일 수정 중 문제가 발생했습니다.",
        });
      },
    },
  );

  const handleUpdate = (date: Date) => {
    if (parentType === "task") {
      updateTaskRequest({
        taskId: parentId,
        startAt: isStartAt ? date : undefined,
        endAt: isStartAt ? undefined : date,
        projectId: project?.id,
      });
    } else {
      updateMilestoneRequest({
        startAt: isStartAt ? date : undefined,
        endAt: isStartAt ? undefined : date,
        projectId: project?.id,
      });
    }
  };

  const handleDelete = () => {
    if (parentType === "task") {
      updateTaskRequest({
        taskId: parentId,
        startAt: isStartAt ? null : undefined,
        endAt: isStartAt ? undefined : null,
        projectId: project?.id,
      });
    } else {
      updateMilestoneRequest({
        startAt: isStartAt ? null : undefined,
        endAt: isStartAt ? undefined : null,
        projectId: project?.id,
      });
    }
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p
        className={`truncate-1-lines w-80px text-14px font-medium text-gray-600 ${
          parentType === "milestone" ? "basis-[20%]" : ""
        }`}
      >
        {isStartAt ? "시작일" : "종료일"}
      </p>
      <button
        onClick={onOpen}
        className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
      >
        {date
          ? format(
              (isStartAt ? startOfDay : endOfDay)(new Date(date)),
              `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(date)})`,
            )
          : "클릭하여 설정해주세요"}
      </button>

      <CalendarModal
        isOpen={isOpen}
        date={date}
        onClose={onClose}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        minDate={isStartAt ? undefined : startAt}
        maxDate={isStartAt ? endAt : undefined}
      />
    </div>
  );
}
