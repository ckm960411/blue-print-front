import MilestoneTagButton from "@/components/work/project-plan/components/MilestoneTagButton";
import { Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Progress } from "@/utils/types";
import { Task } from "@/utils/types/task";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";

interface TaskProgressFormProps {
  task: Task;
  milestoneId?: number;
}
export default function TaskProgressForm({
  task,
  milestoneId,
}: TaskProgressFormProps) {
  const queryClient = useQueryClient();

  const project = useRecoilValue(projectState);
  const [editing, setEditing] = useState(false);

  const progresses = [
    { id: Progress.ToDo, title: "To Do", color: Colors.orange[50] },
    { id: Progress.InProgress, title: "In Progress", color: Colors.blue[50] },
    { id: Progress.Review, title: "Review", color: Colors.purple[50] },
    { id: Progress.Completed, title: "Completed", color: Colors.green[50] },
  ];

  const currentProgress = progresses.find((p) => p.id === task.progress)!;

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({
    milestoneId,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
    },
  });

  const handleClick = (progress: Progress) => {
    updateTaskRequest({ taskId: task.id, progress, projectId: project?.id });
    handleClose();
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        진행상태
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          <div>
            <MilestoneTagButton
              name={currentProgress.title}
              color={currentProgress.color}
              onClick={handleOpen}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col items-start gap-8px p-16px">
            {progresses.map(({ id, title, color }) => (
              <MilestoneTagButton
                key={id}
                name={title}
                color={color}
                onClick={() => handleClick(id)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
