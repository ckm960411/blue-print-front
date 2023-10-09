import MilestoneCalendarButton from "@/components/work/project-plan/MilestoneCalendarButton";
import { isNil } from "lodash";
import { differenceInDays } from "date-fns";

interface MilestoneEndDateProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (date: Date) => void;
}
export default function MilestoneEndDate({
  startDate,
  endDate,
  onChange,
}: MilestoneEndDateProps) {
  const remainDays = endDate ? differenceInDays(endDate, new Date()) : null;

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        종료일
      </p>
      <div className="flex items-center gap-8px">
        <MilestoneCalendarButton
          date={endDate}
          startDate={startDate}
          onChange={onChange}
        />
        {!isNil(remainDays) && (
          <div
            className={`text-14px font-medium ${
              remainDays <= 2 ? "text-red-500" : "text-gray-600"
            }`}
          >
            {remainDays < 0
              ? `${Math.abs(remainDays)}일 지남`
              : remainDays === 0
              ? "오늘"
              : `${remainDays}일 남음`}
          </div>
        )}
      </div>
    </div>
  );
}
