import { Calendar } from "primereact/calendar";

interface HealthMontlyCalendarProps {}
export default function HealthMonthlyCalendar({}: Readonly<HealthMontlyCalendarProps>) {
  return (
    <div className="px-16px pb-16px">
      <div className="rounded-md shadow-md">
        <p className="px-16px pt-16px text-14px font-bold text-main">
          📅 운동 캘린더
        </p>
        <div className="mt-16px">
          <Calendar inline className="w-full" />
        </div>
      </div>
    </div>
  );
}
