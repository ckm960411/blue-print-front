"use client";

import { Colors } from "@/utils/common/color";
import {
  addDays,
  differenceInDays,
  getDate,
  getDay,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";

import "../../css/work-side-prime-calendar.css";

interface WorkSideCalendarProps {}
export default function WorkSideCalendar({}: WorkSideCalendarProps) {
  const tasks = [
    {
      id: 0,
      from: "2023-10-03",
      to: "2023-10-13",
      color: "red",
    },
    {
      id: 1,
      from: "2023-10-04",
      to: "2023-10-21",
      color: "blue",
    },
    {
      id: 2,
      from: "2023-10-13",
      to: "2023-10-30",
      color: "green",
    },
  ];

  const [date, setDate] = useState<Nullable<Date>>(null);

  type DateInfo = {
    year: number;
    month: number;
    week: number;
    dayOfWeek: number;
  };

  const getDateInfo = (date: Date): DateInfo => {
    const year = getYear(date);
    const month = getMonth(date) + 1; // date-fns's getMonth is 0-indexed.

    // Calculate the first day of the month.
    const firstDayOfMonth = startOfMonth(date);

    // Calculate which week of the month it is.
    let week = Math.floor((getDate(date) + getDay(firstDayOfMonth) - 1) / 7);

    // Calculate which day of the week it is (0 for Sunday, 6 for Saturday).
    let dayOfWeek = getDay(date);

    return {
      year,
      month /* already converted to 1-indexed */,
      week,
      dayOfWeek,
    };
  };

  const getSiblingElement = (el: Element, count: number): Element => {
    if (count === 0) return el;
    const sibling = el.nextElementSibling ?? el;
    if (count === 1) return sibling;
    return getSiblingElement(sibling, count - 1);
  };

  useEffect(() => {
    console.log("date: ", date);
    tasks.forEach((task) => {
      const from = new Date(task.from);
      const to = new Date(task.to);
      for (let i = 0; i <= differenceInDays(to, from); i++) {
        const dateInfo = getDateInfo(addDays(from, i));
        const weeks = document.querySelectorAll(
          'div#work-side-prime-calendar tr[data-pc-section="tablebodyrowprops"]',
        );
        const dayMatched =
          weeks[dateInfo.week].children[dateInfo.dayOfWeek + 1];
        const taskIds = dayMatched.getAttribute("data-task-ids");
        if (taskIds) {
          dayMatched.setAttribute("data-task-ids", `${taskIds},${task.id}`);
        } else {
          dayMatched.setAttribute("data-task-ids", `${task.id}`);
        }

        const taskTr = document.querySelector(
          `div#work-side-prime-calendar tr.week-${dateInfo.week}.task-${task.id}`,
        );
        if (taskTr) {
          const td = taskTr.children[dateInfo.dayOfWeek + 1];
          const tdInnerEl = td.children[0] as HTMLElement;
          tdInnerEl.style.backgroundColor =
            Colors[task.color as keyof typeof Colors][200];
        } else {
          const newTr = document.createElement("tr");
          newTr.className = `week-${dateInfo.week} task-${task.id}`;
          Array.from({ length: 8 }).forEach((_, dayIndex) => {
            const newTd = document.createElement("td");
            newTd.className = "task-td";
            const tdInnerEl = document.createElement("span");
            tdInnerEl.className = `tdInnerEl w-full h-4px`;
            if (dateInfo.dayOfWeek + 1 === dayIndex) {
              tdInnerEl.style.backgroundColor = `${
                Colors[task.color as keyof typeof Colors][200]
              }`;
            }
            newTd.appendChild(tdInnerEl);
            newTr.appendChild(newTd);
          });
          const weekTrLength = document.querySelectorAll(
            `div#work-side-prime-calendar tr.week-${dateInfo.week}`,
          ).length;
          const targetTr = getSiblingElement(
            weeks[dateInfo.week],
            weekTrLength,
          );
          targetTr.insertAdjacentElement("afterend", newTr);
        }
      }
    });
  }, [date]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div>
      <div id="work-side-prime-calendar">
        <PrimeCalendar
          value={date}
          onChange={(e) => setDate(e.value)}
          inline
          showWeek
          onViewDateChange={(e) => setDate(e.value)}
        />
      </div>
    </div>
  );
}
