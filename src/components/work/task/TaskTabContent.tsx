import TaskListCard from "@/components/work/task/TaskListCard";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import { taskKeys } from "@/utils/common/query-keys";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { getAllTask } from "@/utils/services/task";
import { Progress } from "@/utils/types";

interface TaskTabContentProps {
  milestoneId?: number;
}
export default function TaskTabContent({
  milestoneId,
}: Readonly<TaskTabContentProps>) {
  const project = useRecoilValue(projectState);

  const { data: taskData } = useQuery(
    taskKeys.list({ projectId: project?.id, milestoneId }),
    () => {
      if (!project) return Promise.reject("no project");
      return getAllTask({ projectId: project?.id!, milestoneId });
    },
    { enabled: !!project, onError: console.error },
  );

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({
    onError: console.error,
  });

  const handleUpdate = ({ source, destination, draggableId }: DropResult) => {
    if (source.droppableId === destination?.droppableId) return;
    updateTaskRequest({
      taskId: Number(draggableId),
      projectId: project?.id,
      progress: destination?.droppableId! as Progress,
    });
  };

  if (!taskData) return <></>;

  return (
    <DragDropContext onDragEnd={handleUpdate}>
      <div className={`bg-gray-50 p-16px ${milestoneId ? "" : "min-h-screen"}`}>
        <div
          className={
            milestoneId ? "flex flex-col gap-32px" : "grid grid-cols-4 gap-8px"
          }
        >
          {Object.entries(taskData).map(([key, value]) => {
            const taskName = {
              [Progress.ToDo]: "To Do",
              [Progress.InProgress]: "In Progress",
              [Progress.Review]: "Review",
              [Progress.Completed]: "Completed",
            }[key];
            const progressColor = {
              [Progress.ToDo]: "bg-orange-500",
              [Progress.InProgress]: "bg-blue-500",
              [Progress.Review]: "bg-purple-500",
              [Progress.Completed]: "bg-green-500",
            }[key];
            const tasks = taskData[key as Progress];

            return (
              <Droppable key={key} droppableId={key}>
                {(provided) => (
                  <div
                    className="flex flex-col gap-16px"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="flex items-center gap-8px border-b border-gray-200 pb-8px text-14px font-semibold">
                      <div
                        className={`h-12px w-12px rounded-full ${progressColor}`}
                      />
                      <span>{taskName}</span>
                      <div className="flex-center h-14px min-w-[14px] rounded-full bg-white text-12px font-medium text-gray-600">
                        {tasks.length}
                      </div>
                    </div>
                    {tasks.map((task, index) => (
                      <Draggable
                        key={`${task.id}`}
                        draggableId={`${task.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TaskListCard
                              task={task}
                              milestoneId={milestoneId}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}
