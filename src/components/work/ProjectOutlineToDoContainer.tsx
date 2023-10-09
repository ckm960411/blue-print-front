import { addDays, differenceInDays, format } from "date-fns";

interface ProjectOutlineToDoContainerProps {}
export default function ProjectOutlineToDoContainer({}: ProjectOutlineToDoContainerProps) {
  // TODO: 실제 데이터 반영 필요
  const data = [
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
  ];

  return (
    <div className="flex flex-col gap-12px">
      <p className="text-14px font-medium text-gray-600">오늘 업무 진행도</p>
      <div className="flex flex-col gap-8px">
        {data.map(({ title, percentage, endDate }, i) => {
          const remainDays =
            differenceInDays(new Date(endDate), new Date()) + 1;

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
                  remainDays <= 2 ? "font-medium text-red-500" : "text-gray-600"
                }`}
              >
                D{remainDays * -1}일
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
