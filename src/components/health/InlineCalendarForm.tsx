import { format, isSameDay } from "date-fns";
import { Calendar } from "primereact/calendar";

interface InlineCalendarFormProps {
  date: Date;
  onChangeDate: (date: Date) => void;
}
export default function InlineCalendarForm({
  date,
  onChangeDate,
}: Readonly<InlineCalendarFormProps>) {
  return (
    <div>
      <div className="flex items-center gap-8px">
        <span>날짜(선택) :</span>
        <p className="text-16px">
          {isSameDay(new Date(), date) ? (
            <span>오늘</span>
          ) : (
            <span className="font-bold text-main">
              {format(date, "yyyy년 M월 d일")}
            </span>
          )}
        </p>
      </div>
      <Calendar
        value={date}
        onChange={({ value }) => value && onChangeDate(value)}
        inline
        className="w-full"
      />
    </div>
  );
}
