import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";

export default function CalendarTab() {
  return (
    <div className="p-16px">
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin]}
        initialView="multiMonthYear"
        multiMonthMaxColumns={1}
      />
    </div>
  );
}
