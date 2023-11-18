import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllTask } from "@/utils/services/task";
import { Progress } from "@/utils/types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export default function TaskTabContent() {
  const project = useRecoilValue(projectState);

  const { data: taskData } = useQuery(
    [QueryKeys.getAllTasks(project?.id)],
    () => getAllTask({ projectId: project?.id! }),
    { onError: console.error },
  );

  if (!taskData) return <></>;

  return (
    <DragDropContext
      onDragEnd={(dropResult) => console.log(">>> dropResult: ", dropResult)}
    >
      <div className="min-h-screen bg-gray-50 p-16px">
        <div className="grid grid-cols-4 gap-8px">
          {Object.entries(taskData).map(([key, value]) => {
            const taskName = {
              [Progress.ToDo]: "To Do",
              [Progress.InProgress]: "In Progress",
              [Progress.Review]: "Review",
              [Progress.Completed]: "Completed",
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
                    <div className="flex items-center gap-8px text-14px font-semibold">
                      <div className="h-12px w-12px rounded-full bg-orange-500"></div>
                      <span>{taskName}</span>
                      <div className="flex-center h-14px min-w-[14px] rounded-full bg-white text-12px font-medium text-gray-600">
                        {tasks.length}
                      </div>
                    </div>
                    <div className="rounded-md bg-white p-16px">content</div>
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
