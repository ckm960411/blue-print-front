import MilestoneCalendarButton from "@/components/work/project-plan/MilestoneCalendarButton";

interface MilestoneStartDateProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (date: Date) => void;
}
export default function MilestoneStartDate({
  startDate,
  endDate,
  onChange,
}: MilestoneStartDateProps) {
  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        시작일
      </p>
      <MilestoneCalendarButton
        date={startDate}
        endDate={endDate}
        onChange={onChange}
      />
    </div>
  );
}
