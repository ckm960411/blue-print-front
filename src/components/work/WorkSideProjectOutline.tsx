import ProjectQuarter from "@/components/work/ProjectQuarter";
import CircularProgressWrapper from "@/components/components/CircularProgressWrapper";
import { addDays, differenceInBusinessDays, format } from "date-fns";

interface WorkSideProjectOutlineProps {}
export default function WorkSideProjectOutline({}: WorkSideProjectOutlineProps) {
  return (
    <div className="px-16px">
      <div className="flex-between border-b border-gray-200 pb-16px">
        <p className="text-18px font-bold">Project Outline</p>
        <ProjectQuarter />
      </div>
      {/* TODO: 실제 데이터 반영 필요*/}
      <div className="flex flex-col gap-24px border-b border-gray-200 py-16px">
        <div className="flex flex-col gap-8px">
          <div className="flex-between text-14px font-medium text-gray-600">
            <p>OKR 진척도</p>
            <p>오늘 업무 진행도</p>
          </div>
          <div className="flex-between text-24px font-bold text-gray-800">
            {[
              { percentage: 52.6, color: "#001487" },
              { percentage: 42.3, color: "#10b981" },
            ].map(({ percentage, color }, i) => (
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
            <p className="text-14px font-medium text-gray-600">전체 OKR 분포</p>
            <p className="text-14px font-bold text-gray-800">
              {Math.floor(((52.6 + 42.3) / 2) * 10) / 10}%
            </p>
          </div>
          <div className="flex h-8px items-center justify-start overflow-hidden rounded-md bg-gray-200">
            {[
              { percentage: 52.6, color: "#001487" },
              { percentage: 42.3, color: "#10b981" },
            ].map(({ percentage, color }, i) => (
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
          {[
            { title: "OKR 1", percentage: 80, color: "#0ea5e9" },
            { title: "OKR 2", percentage: 10, color: "#14b8a6" },
            { title: "OKR 3", percentage: 56, color: "#f97316" },
            { title: "OKR 4", percentage: 22, color: "#ec4899" },
          ].map(({ title, percentage, color }, index) => (
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
          {[
            {
              title: "어쩌구저쩌구 하는 업무1",
              percentage: 50,
              endDate: format(addDays(new Date(), 5), "yyyy.MM.dd"),
            },
            {
              title: "어쩌구저쩌구 하는 업무2",
              percentage: 30,
              endDate: format(addDays(new Date(), 2), "yyyy.MM.dd"),
            },
            {
              title: "어쩌구저쩌구 하는 업무3",
              percentage: 20,
              endDate: format(addDays(new Date(), 1), "yyyy.MM.dd"),
            },
            {
              title: "어쩌구저쩌구 하는 업무4",
              percentage: 80,
              endDate: format(addDays(new Date(), 8), "yyyy.MM.dd"),
            },
          ].map(({ title, percentage, endDate }, i) => {
            const remainDays =
              differenceInBusinessDays(new Date(endDate), new Date()) + 1;

            return (
              <div key={i} className="flex items-center gap-8px">
                <p className="w-32px flex-shrink-0 text-12px text-gray-600">
                  {percentage}%
                </p>
                <p className="truncate-1-lines grow text-14px font-medium text-gray-700">
                  {title}
                </p>
                <div className="h-8px w-120px flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                  <div
                    className="h-full rounded-md bg-main"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p
                  className={`w-48px flex-shrink-0 text-right text-12px ${
                    remainDays <= 2
                      ? "font-medium text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  D-{remainDays}일
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
