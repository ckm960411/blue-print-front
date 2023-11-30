import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { LegacyRef, useRef } from "react";

export default function CalendarTab() {
  const calendarRef = useRef<FullCalendar>();

  return (
    <div className="p-16px">
      <FullCalendar
        ref={calendarRef as LegacyRef<FullCalendar>}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        fixedWeekCount={false}
        titleFormat={{ year: "numeric", month: "short" }}
        weekNumbers={true}
        events={[
          {
            id: "1",
            title: "rangerangerangerangerangerangerangerange",
            start: "2023-11-24",
            end: "2023-11-28",
            color: "#001487",
            startEditable: true,
            interactive: true,
            className: "mb-4px rounded-md font-semibold",
          },
          {
            title: "date",
            date: "2023-11-24",
            textColor: "red",
            display: "list-item",
            startEditable: true,
          },
          {
            title: "date",
            date: "2023-11-24",
            textColor: "red",
            display: "list-item",
            startEditable: true,
          },
          {
            title: "date",
            date: "2023-11-24",
            textColor: "red",
            display: "list-item",
            startEditable: true,
          },
        ]}
        dayMaxEventRows={3}
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
