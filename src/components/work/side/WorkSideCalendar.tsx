"use client";

import { ColorKey, Colors } from "@/utils/common/color";
import { getThisMonthTasks } from "@/utils/services/task";
import { Task } from "@/utils/types/task";
import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  isWithinInterval,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { forEach, isNil } from "lodash";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useRef, useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";

import "../../../css/work-side-prime-calendar.css";

interface WorkSideCalendarProps {}
export default function WorkSideCalendar({}: WorkSideCalendarProps) {
  let keys = Object.keys(Colors) as ColorKey[];
  let usedKeys = [] as ColorKey[];

  const getRandomColorKey = () => {
    if (keys.length === 0) {
      keys = [...usedKeys];
      usedKeys = [];
    }

    const randomIndex = Math.floor(Math.random() * keys.length);
    const key = keys[randomIndex];

    // Remove the selected key from the 'keys' array and add it to the 'usedKeys' array.
    keys.splice(randomIndex, 1);
    usedKeys.push(key);

    return key;
  };

  const calendar = useRef<PrimeCalendar>();

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [visible, setVisible] = useState(false);

  const { data: tasks = [] } = useQuery(
    ["get-this-month-tasks", date],
    () =>
      getThisMonthTasks({
        year: date ? getYear(date) : undefined,
        month: date ? getMonth(date) + 1 : undefined,
      }),
    {
      onSuccess: (data) => addTimeline(data),
      onError: console.error,
    },
  );

  type DateInfo = {
    year: number;
    month: number;
    week: number;
    dayOfWeek: number;
  };

  const getDateInfo = (date: Date): DateInfo => {
    const year = getYear(date);
    const month = getMonth(date) + 1;

    const firstDayOfMonth = startOfMonth(date);
    let week = Math.floor((getDate(date) + getDay(firstDayOfMonth) - 1) / 7);
    let dayOfWeek = getDay(date);

    return {
      year,
      month,
      week, // 월 안에서 몇번째 인덱스인지
      dayOfWeek,
    };
  };

  const getSiblingElement = (el: Element, count: number): Element => {
    if (count === 0) return el;
    const sibling = el.nextElementSibling ?? el;
    if (count === 1) return sibling;
    return getSiblingElement(sibling, count - 1);
  };

  const getWeekTableRowList = () =>
    document.querySelectorAll('tr[data-pc-section="tablebodyrowprops"]');

  // TODO: task 타입 수정 필요
  const addDayTaskIds = (
    currentWeek: Element,
    currentDayIndex: number,
    task: Task,
  ) => {
    const dayMatched = currentWeek.children[currentDayIndex];
    const taskIds = dayMatched.getAttribute("data-task-ids");
    if (taskIds) {
      dayMatched.setAttribute("data-task-ids", `${taskIds},${task.id}`);
    } else {
      dayMatched.setAttribute("data-task-ids", `${task.id}`);
    }
  };

  const addTableDataInTableRow = (
    currentDayIndex: number,
    tableRow: Element,
    color: ColorKey,
  ) => {
    forEach(Array.from({ length: 8 }), (_, dayIndex) => {
      const tableData = document.createElement("td");
      tableData.className = "task-td";
      const tableDataSpan = document.createElement("span");
      tableDataSpan.className = `tableDataSpan w-full h-4px`;
      if (currentDayIndex === dayIndex) {
        tableDataSpan.style.backgroundColor = `${Colors[color][200]}`;
      }
      tableData.appendChild(tableDataSpan);
      tableRow.appendChild(tableData);
    });
  };

  // TODO: task 타입 수정 필요
  const addTableRowTaskColor = (
    currentWeek: Element,
    currentWeekIndex: number,
    currentDayIndex: number,
    task: Task,
    color: ColorKey,
  ) => {
    const taskTr = document.querySelector(
      `div#work-side-prime-calendar tr.week-${currentWeekIndex}.task-${task.id}`,
    );
    if (taskTr) {
      const td = taskTr.children[currentDayIndex];
      const tableDataSpan = td.children[0] as HTMLElement;
      tableDataSpan.style.backgroundColor = Colors[color][200];
    } else {
      const tableRow = document.createElement("tr");
      tableRow.className = `week-${currentWeekIndex} task-${task.id}`;

      addTableDataInTableRow(currentDayIndex, tableRow, color);
      const weekTrLength = document.querySelectorAll(
        `div#work-side-prime-calendar tr.week-${currentWeekIndex}`,
      ).length;
      const targetTr = getSiblingElement(currentWeek, weekTrLength);
      targetTr.insertAdjacentElement("afterend", tableRow);
    }
  };

  const addTimeline = (tasks: Task[]) => {
    tasks
      .filter((task) => task.startAt && task.endAt)
      .forEach((task) => {
        const from = new Date(format(new Date(task.startAt!), "yyyy-MM-dd"));
        const to = new Date(format(new Date(task.endAt!), "yyyy-MM-dd"));
        const differenceBetweenFromTo = differenceInDays(to, from) + 1;
        const color = getRandomColorKey();

        // 각 task 의 시작일부터 끝나는 날까지 동작 반복 수행
        forEach(Array.from({ length: differenceBetweenFromTo }), (_, i) => {
          const dateInfo = getDateInfo(addDays(from, i)); // 해당 일자의 연,월,주,일 정보
          const weeks = getWeekTableRowList(); // 해당 월에 포함되는 weekList
          const currentWeekIndex = dateInfo.week;
          const currentDayIndex = dateInfo.dayOfWeek + 1; // 달력에 주차 표시로 인해 column이 1개 더 많으므로
          const currentWeek = weeks[currentWeekIndex];

          addDayTaskIds(currentWeek, currentDayIndex, task);
          setTimeout(() => {
            addTableRowTaskColor(
              currentWeek,
              currentWeekIndex,
              currentDayIndex,
              task,
              color,
            );
          }, 200);
        });
      });
  };

  useEffect(() => {
    date && tasks && addTimeline(tasks);
  }, [date, tasks]);

  return (
    <div>
      <div id="work-side-prime-calendar">
        <PrimeCalendar
          ref={calendar as any}
          value={date}
          onChange={({ originalEvent, value }) => {
            console.log("originalEvent: ", originalEvent);
            if (isNil(value)) return;
            const foundTasks = tasks.filter((task) => {
              return (
                task.startAt &&
                task.endAt &&
                isWithinInterval(value, {
                  start: startOfDay(new Date(task.startAt)),
                  end: endOfDay(new Date(task.endAt)),
                })
              );
            });

            foundTasks.length > 0 && setVisible(true);
          }}
          inline
          showWeek
          onViewDateChange={(e) => setDate(e.value)}
        />
      </div>
      <ConfirmPopup
        target={calendar.current?.getElement()}
        visible={visible}
        onHide={() => setVisible(false)}
        icon="pi pi-exclamation-triangle"
        className="w-full max-w-[367px]"
        message={
          <div className="w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            assumenda commodi mollitia nobis odit perspiciatis porro quae sint
            unde vel. Aperiam error laborum mollitia rem! Illum optio quod quos
            recusandae?
          </div>
        }
        acceptLabel="닫기"
        accept={() => setVisible(false)}
        acceptClassName="border border-gray-200 rounded-md py-4px px-8px"
        rejectClassName="hidden"
      />
    </div>
  );
}
