import { ColorKey, Colors } from "@/utils/common/color";
import { Task } from "@/utils/types/task";
import {
  addDays,
  differenceInDays,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";
import { forEach } from "lodash";

/**
 * Colors 에의 key 를 중복없이 랜덤으로 추출하는 함수
 */
const getRandomColorKey = () => {
  let keys = Object.keys(Colors) as ColorKey[];
  let usedKeys = [] as ColorKey[];

  return (() => {
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
  })();
};

/**
 * date 에 해당하는 달력의 연, 월, week 인덱스, 일자를 가져오는 함수
 */
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

/**
 * prime-react 의 각 주 row 를 가져옴
 */
const getWeekTableRowList = () =>
  document.querySelectorAll('tr[data-pc-section="tablebodyrowprops"]');

/**
 *  각 주 weekTr 다음 weekTr 에는 task 를 표시하는 가로선 tr 태그가 있음
 *  weekTr 의 형제요소 개수를 구해 그 다음 형제요소를 가져옴
 *  형제요소가 0개라면 weekTr 본인
 *  형제요소가 1개라면 해당 형제요소
 *  2개 이상이라면 재귀로 그다음 형제요소를 가져옴
 */
const getSiblingElement = (el: Element, count: number): Element => {
  if (count === 0) return el;
  const sibling = el.nextElementSibling ?? el;
  if (count === 1) return sibling;
  return getSiblingElement(sibling, count - 1);
};

export const addTimeline = (tasks: Task[]) => {
  tasks
    .filter((task) => task.startAt && task.endAt)
    .forEach((task) => {
      const from = new Date(task.startAt!);
      const to = new Date(task.endAt!);
      const differenceBetweenFromTo = differenceInDays(to, from) + 1;
      const color = getRandomColorKey();

      // 각 task 의 시작일부터 끝나는 날까지 동작 반복 수행
      forEach(Array.from({ length: differenceBetweenFromTo }), (_, i) => {
        const dateInfo = getDateInfo(addDays(from, i)); // 해당 일자의 연,월,주,일 정보
        const weeks = getWeekTableRowList(); // 해당 월에 포함되는 weekList
        const currentWeekIndex = dateInfo.week;
        const currentDayIndex = dateInfo.dayOfWeek + 1; // 달력에 주차 표시로 인해 column이 1개 더 많으므로
        const currentWeekTr = weeks[currentWeekIndex];

        // 현재 주의 인덱스에 해당하는 날짜 td 태그에 현재 있는 task.id 를 주입함
        const dayMatchedTd = currentWeekTr.children[currentDayIndex];
        const taskIds = dayMatchedTd.getAttribute("data-task-ids");
        if (taskIds) {
          if (taskIds.split(",").includes(`${task.id}`)) return;
          dayMatchedTd.setAttribute("data-task-ids", `${taskIds},${task.id}`);
        } else {
          dayMatchedTd.setAttribute("data-task-ids", `${task.id}`);
        }

        // task별 색깔 가로선이 될 Tr 생성
        const colorTaskTr = document.querySelector(
          `div#work-side-prime-calendar tr.week-${currentWeekIndex}.task-${task.id}`,
        );
        if (colorTaskTr) {
          // 이미 해당 task.id 의 colorTaskTr 이 있는 경우 일치하는 Td의 span 에 컬러를 입힘
          const td = colorTaskTr.children[currentDayIndex];
          const tableDataSpan = td.children[0] as HTMLElement;
          tableDataSpan.style.backgroundColor = Colors[color][200];
        } else {
          // 해당 task.id 의 colorTaskTr 이 없는 경우 새로 생성하고 task.id 를 주입
          const newColorTaskTr = document.createElement("tr");
          newColorTaskTr.className = `week-${currentWeekIndex} task-${task.id}`;
          // newTaskTr 에 일자별로 td 와 span 추가 (컬러선이 될 td 와 span)
          forEach(Array.from({ length: 8 }), (_, dayIndex) => {
            const newTd = document.createElement("td");
            newTd.className = "task-td";
            const tdSpan = document.createElement("span");
            tdSpan.className = `tableDataSpan w-full h-4px`;
            // 그리고 해당 날짜는 컬러를 추가
            if (currentDayIndex === dayIndex) {
              tdSpan.style.backgroundColor = `${Colors[color][200]}`;
            }
            // td 에 span 을 주입하고 td 는 다시 tr 에 주입
            newTd.appendChild(tdSpan);
            newColorTaskTr.appendChild(newTd);
          });
          // 생성된 newColorTaskTr 을 weekTr 또는 이전 colorTaskTr 을 찾아 그 다음으로 주입
          const weekTrLength = document.querySelectorAll(
            `div#work-side-prime-calendar tr.week-${currentWeekIndex}`,
          ).length;
          const targetTr = getSiblingElement(currentWeekTr, weekTrLength);
          targetTr.insertAdjacentElement("afterend", newColorTaskTr);
        }
      });
    });
};
