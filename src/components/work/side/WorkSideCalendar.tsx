"use client";

import TaskCalendar from "@/components/work/side/TaskCalendar";
import { ConfirmPopup } from "primereact/confirmpopup";
import { useRef, useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";

import "../../../css/work-side-prime-calendar.css";

interface WorkSideCalendarProps {}
export default function WorkSideCalendar({}: WorkSideCalendarProps) {
  const calendar = useRef<PrimeCalendar>();

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <TaskCalendar calendar={calendar} setVisible={setVisible} />
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
