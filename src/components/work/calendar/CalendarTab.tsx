import { convertWorkToCalendarEvent } from "@/utils/common/work/calendar/convertWorkToCalendarEvent";
import { projectState } from "@/utils/recoil/store";
import { getThisMonthWorks } from "@/utils/services/work/[projectId]/calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getMonth, getYear } from "date-fns";
import { MutableRefObject, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export default function CalendarTab() {
  const calendarRef = useRef<FullCalendar>();
  const project = useRecoilValue(projectState);

  const [year, setYear] = useState(getYear(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()) + 1);

  const { data: calendarWorks } = useQuery(
    ["calendar", year, month, project?.id],
    () => {
      if (!project?.id) return Promise.reject(new Error("no project Id"));
      return getThisMonthWorks({ projectId: project.id, year, month });
    },
    { enabled: !!project, onError: console.error },
  );

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

  const works = calendarWorks
    ? calendarWorks.map(convertWorkToCalendarEvent)
    : [];

  return (
    <div className="p-16px">
      <FullCalendar
        ref={calendarRef as MutableRefObject<FullCalendar>}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        fixedWeekCount={false}
        titleFormat={{ year: "numeric", month: "short" }}
        weekNumbers={true}
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
        events={works}
        dayMaxEventRows={6}
        moreLinkClick={(morLinkArg) => console.log("morLinkArg: ", morLinkArg)}
        dateClick={(dateClickArg) =>
          console.log("dateClickArg: ", dateClickArg)
        }
        eventDrop={(eventDropArg) =>
          console.log("eventDropArg: ", eventDropArg)
        }
        eventMouseEnter={(eventHoveringArg) =>
          console.log("eventHoveringArg: ", eventHoveringArg)
        }
        eventClick={(eventClickArg) =>
          console.log("eventClickArg: ", eventClickArg)
        }
      />
    </div>
  );
}
