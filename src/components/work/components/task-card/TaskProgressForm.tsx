import MilestoneTagButton from "@/components/work/project-plan/components/MilestoneTagButton";
import { Colors } from "@/utils/common/color";
import { Progress } from "@/utils/types";
import { Task } from "@/utils/types/task";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";

interface TaskProgressFormProps {
  task: Task;
}
export default function TaskProgressForm({ task }: TaskProgressFormProps) {
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

  const handleClick = (progress: Progress) => {
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
