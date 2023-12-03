import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { getMonth, getYear } from "date-fns";
import { MutableRefObject, useRef, useState } from "react";

interface HealthCalendarProps {}
export default function HealthCalendar({}: Readonly<HealthCalendarProps>) {
  const calendarRef = useRef<FullCalendar>();

  const [year, setYear] = useState(getYear(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()) + 1);

  const getYearAndWeek = (ref: MutableRefObject<FullCalendar | undefined>) => {
    if (!ref.current) {
      return {
        year: getYear(new Date()),
        month: getMonth(new Date()) + 1,
      };
    }
    const date = ref.current.getApi().getDate();
    const year = getYear(date);
    const month = getMonth(date) + 1;
    return { year, month };
  };

  return (
    <div className="mt-16px">
      <FullCalendar
        ref={calendarRef as MutableRefObject<FullCalendar>}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        fixedWeekCount={false}
        titleFormat={{ year: "numeric", month: "short" }}
        weekNumbers={true}
        height="auto"
        customButtons={{
          prevButton: {
            text: "prev",
            click: () => {
              if (!calendarRef.current) return;
              calendarRef.current.getApi().prev();
              const { year, month } = getYearAndWeek(calendarRef);
              setYear(year);
              setMonth(month);
            },
          },
          nextButton: {
            text: "next",
            click: () => {
              if (!calendarRef.current) return;
              calendarRef.current?.getApi().next();
              const { year, month } = getYearAndWeek(calendarRef);
              setYear(year);
              setMonth(month);
            },
          },
        }}
        headerToolbar={{
          left: "title",
          right: "prevButton,nextButton",
        }}
        events={[]}
        dayMaxEventRows={6}
        eventClick={(eventClickArg) => {}}
      />
    </div>
  );
}
