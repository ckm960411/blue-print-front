import CircularProgressWrapper from "@/components/components/CircularProgressWrapper";
import { ColorKey, Colors } from "@/utils/common/color";
import { useMilestonesQuery } from "@/utils/hooks/react-query/useMilestonesQuery";
import { DateTime, Progress } from "@/utils/types";
import { Milestone, MilestoneClassification } from "@/utils/types/milestone";
import { differenceInDays } from "date-fns";
import { filter, pipe, map } from "lodash/fp";

interface MilestoneOutline {
  title: string;
  color: ColorKey;
  taskCount: number;
  endAt: DateTime | null;
  percentage: number;
}

interface ProjectOutlineSummaryProps {}
export default function ProjectOutlineSummary({}: ProjectOutlineSummaryProps) {
  const { OKR } = MilestoneClassification;

  const { data: milestones = [] } = useMilestonesQuery();

  const getPercentage = (percentage: number) =>
    percentage === 0 ? 0 : Math.floor(percentage * 10) / 10;

  const getMilestones = (isOKR: boolean): MilestoneOutline[] => {
    return pipe(
      filter((milestone: Milestone) =>
        isOKR
          ? milestone.classification === OKR
          : milestone.classification !== OKR,
      ),
      map((milestone) => {
        const tasks = milestone.tasks;
        const completedTasks = tasks.filter(
          (task) => task.progress === Progress.Completed,
        );
        const percentage = (completedTasks.length / tasks.length) * 100;
        return {
          title: milestone.title,
          color: milestone.color,
          taskCount: tasks.length,
          endAt: milestone.endAt,
          percentage: completedTasks.length > 0 ? getPercentage(percentage) : 0,
        };
      }),
    )(milestones);
  };

  const getMilestonesAverage = (milestoneOutline: MilestoneOutline[]) => {
    const percentageSum = milestoneOutline.reduce(
      (acc, cur) => acc + cur.percentage * cur.taskCount,
      0,
    );
    const totalTaskCount = milestoneOutline.reduce(
      (acc, cur) => acc + cur.taskCount,
      0,
    );
    return getPercentage(
      percentageSum === 0 ? 0 : percentageSum / totalTaskCount,
    );
  };

  const okrMilestones = getMilestones(true);
  const normalMilestones = getMilestones(false);

  const okrMilestonesAverage = getMilestonesAverage(okrMilestones);
  const normalMilestonesAverage = getMilestonesAverage(normalMilestones);

  const projectData = [
    { percentage: okrMilestonesAverage, color: "#001487" },
    { percentage: normalMilestonesAverage, color: "#10b981" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-24px border-b border-gray-200 py-16px">
        <div className="flex flex-col gap-8px">
          <div className="flex-between text-14px font-medium text-gray-600">
            <p>OKR 진척도</p>
            <p>업무 진행도</p>
          </div>
          <div className="flex-between text-24px font-bold text-gray-800">
            {projectData.map(({ percentage, color }, i) => (
              <div key={i} className="flex items-center gap-6px">
                <CircularProgressWrapper
                  value={percentage}
                  w={24}
                  strokeWidth={14}
                  pathColor={color}
                />
                <p>{percentage}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8px">
          <div className="flex-between">
            <p className="text-14px font-medium text-gray-600">
              전체 프로젝트 진척도
            </p>
            <p className="text-14px font-bold text-gray-800">
              {getPercentage(
                (okrMilestonesAverage + normalMilestonesAverage) / 2,
              )}
              %
            </p>
          </div>
          <div className="flex h-8px items-center justify-start overflow-hidden rounded-md bg-gray-200">
            {projectData.map(({ percentage, color }, i) => (
              <div
                key={i}
                className="h-full"
                style={{
                  width: `${percentage / 2}%`,
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="py-16px">
        <div className="grid grid-cols-4">
          {okrMilestones.map(({ title, percentage, color }, index) => (
            <div key={index} className="flex-center flex-col gap-12px">
              <div
                className={`flex-center flex w-full ${
                  index === 0 ? "" : "border-l border-gray-200"
                }`}
              >
                <CircularProgressWrapper
                  value={percentage}
                  w={40}
                  pathColor={color}
                />
              </div>
              <div className="truncate-1-lines px-4px text-center text-12px font-medium text-gray-600">
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-12px">
        <p className="text-14px font-medium text-gray-600">오늘 업무 진행도</p>
        <div className="flex flex-col gap-8px">
          {normalMilestones.map(({ title, percentage, endAt, color }, i) => {
            const remainDays = endAt
              ? differenceInDays(new Date(endAt), new Date()) + 1
              : null;

            return (
              <div key={i} className="flex items-center gap-8px">
                <p className="w-42px flex-shrink-0 text-12px text-gray-600">
                  {percentage}%
                </p>
                <p className="truncate-1-lines grow text-14px font-medium text-gray-700">
                  {title}
                </p>
                <div className="h-8px w-120px flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                  <div
                    className="h-full rounded-md"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: Colors[color][500],
                    }}
                  />
                </div>
                {remainDays ? (
                  <p
                    className={`w-48px flex-shrink-0 text-right text-12px ${
                      remainDays <= 2
                        ? "font-medium text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    D{remainDays * -1}일
                  </p>
                ) : (
                  <div className="h-2px w-48px" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
