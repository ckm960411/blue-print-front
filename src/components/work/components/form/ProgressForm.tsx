import TagButton from "@/components/work/components/form/TagButton";
import { Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Progress } from "@/utils/types";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface ProgressFormProps {
  parentType: "milestone" | "task";
  parentId: number;
  progress: Progress;
}
export default function ProgressForm({
  parentType,
  parentId,
  progress,
}: ProgressFormProps) {
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);
  const [editing, setEditing] = useState(false);

  const progresses = [
    { id: Progress.ToDo, title: "To Do", color: Colors.orange[50] },
    { id: Progress.InProgress, title: "In Progress", color: Colors.blue[50] },
    { id: Progress.Review, title: "Review", color: Colors.purple[50] },
    { id: Progress.Completed, title: "Completed", color: Colors.green[50] },
  ];

  const currentProgress = progresses.find((p) => p.id === progress)!;

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({
    milestoneId: parentId,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
    },
  });

  const { mutate: updateMilestoneRequest } =
    useUpdateMilestoneMutation(parentId);

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const handleClick = (progress: Progress) => {
    switch (parentType) {
      case "milestone":
        updateMilestoneRequest({ progress, projectId: project?.id });
        break;
      case "task":
        updateTaskRequest({
          taskId: parentId,
          progress,
          projectId: project?.id,
        });
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines basis-[20%] text-14px font-medium text-gray-600">
        진행상태
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          <div>
            <TagButton
              name={currentProgress.title}
              color={currentProgress.color}
              onClick={handleOpen}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col items-start gap-8px p-16px">
            {progresses.map(({ id, title, color }) => (
              <TagButton
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
