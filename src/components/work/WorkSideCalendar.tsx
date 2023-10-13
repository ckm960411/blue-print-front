"use client";

import { Colors } from "@/utils/common/color";
import { ko } from "date-fns/locale";
import { findIndex, forEach, reduce, some } from "lodash";
import { useEffect } from "react";
import { Calendar } from "react-date-range";
import { pipe, filter, forEach as forEachFP } from "lodash/fp";

import "../../css/work-side-calenar.css";

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
      id: 0,
      from: "2023-10-13",
      to: "2023-10-21",
      color: "blue",
    },
    {
      id: 0,
      from: "2023-10-13",
      to: "2023-11-27",
      color: "green",
    },
  ];

  const buttonGroupSize = 7;
  const relevantClasses = ["rdrStartEdge", "rdrInRange", "rdrEndEdge"];

  const groupButtonsByIndex = (buttons: Element[]) => {
    return reduce(
      buttons,
      (acc, btn, index) => {
        const groupIndex = Math.floor(index / buttonGroupSize);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(btn);
        return acc;
      },
      {} as Record<number, Element[]>,
    );
  };

  const isRelevantButtonChild = (btnChild: Element) => {
    return some(relevantClasses, (className) => {
      return btnChild.className.includes(className);
    });
  };

  const setChildColorClass = (
    childColors: string[],
    btnChild: Element,
  ): void => {
    const color = (btnChild as HTMLElement).style.color;

    let colorIndex = findIndex(
      childColors,
      (childColor) => childColor === color,
    );

    if (colorIndex < 0) {
      colorIndex = childColors.length;
      childColors.push(color);
    }

    btnChild.setAttribute("class", `${btnChild.className} order-${colorIndex}`);
  };

  const setTimeline = () => {
    if (typeof document === "undefined") return;

    setTimeout(() => {
      const rdrDays: HTMLElement | null = document.querySelector(".rdrDays");
      if (!rdrDays) return;

      const buttons = Array.from(rdrDays.children);
      const btnGroups: Record<number, Element[]> = groupButtonsByIndex(buttons);

      forEach(Object.values(btnGroups), (btns) => {
        let childColors: string[] = [];

        forEach(btns, (btn) => {
          pipe(
            filter(isRelevantButtonChild),
            forEachFP((btnChild: Element) => {
              setChildColorClass(childColors, btnChild);
            }),
          )(btn.children);
        });
      });
    }, 0);
  };

  useEffect(() => {
    setTimeline();
  }, []);

  return (
    <div>
      <div id="work-side-calendar">
        <Calendar
          locale={ko}
          displayMode="dateRange"
          ranges={tasks.map((task) => ({
            startDate: new Date(task.from),
            endDate: new Date(task.to),
            color: Colors[task.color as keyof typeof Colors][50],
            showDateDisplay: false,
          }))}
          onShownDateChange={setTimeline}
          dragSelectionEnabled={false}
          preventSnapRefocus={false}
        />
      </div>
    </div>
  );
}
