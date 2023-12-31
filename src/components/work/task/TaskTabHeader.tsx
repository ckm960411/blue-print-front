import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { taskKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllTask } from "@/utils/services/task";

export default function TaskTabHeader() {
  const project = useRecoilValue(projectState);

  const { data: taskData } = useQuery(
    taskKeys.list({ projectId: project?.id }),
    () => {
      if (!project) return Promise.reject("no project");
      return getAllTask({ projectId: project.id });
    },
    { enabled: !!project, onError: console.error },
  );

  if (!taskData) return <></>;

  const completedLength = taskData.Completed.length;
  const allTaskLength = Object.values(taskData).reduce((acc, cur) => {
    return acc + cur.length;
  }, 0);
  const completedRatio =
    completedLength === 0 || allTaskLength === 0
      ? 0
      : Math.ceil((completedLength / allTaskLength) * 100 * 10) / 10;

  return (
    <div className="p-16px">
      <div className="flex grow flex-col gap-8px">
        <p className="text-20px font-semibold text-gray-800">Daily Tasks</p>
        <div className="flex w-full max-w-[420px] items-center gap-8px">
          <span className="text-14px font-medium text-gray-600">진행도</span>
          <div className="h-4px flex-shrink-0 grow rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-400"
              style={{ width: `${completedRatio}%` }}
            />
          </div>
          <span className="text-14px font-medium text-gray-600">
            {completedRatio}%
          </span>
        </div>
      </div>
    </div>
  );
}
