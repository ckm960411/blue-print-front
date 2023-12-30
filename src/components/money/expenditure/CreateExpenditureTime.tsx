import NumberInputController from "@/components/components/NumberInputController";
import { endOfMonth, getDate } from "date-fns";
import React from "react";

interface CreateExpenditureTimeProps {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  onChange: (type: "date" | "hour" | "minute", value: number) => void;
}
export default function CreateExpenditureTime({
  year,
  month,
  date,
  hour,
  minute,
  onChange,
}: Readonly<CreateExpenditureTimeProps>) {
  return (
    <div className="flex flex-col gap-8px">
      <div className="flex items-center gap-8px">
        <span className="w-40px text-16px font-bold">날짜 :</span>
        <NumberInputController
          value={date}
          onChange={(_, value) => {
            const endDateOfMonth = getDate(endOfMonth(new Date(year, month)));
            if (value === endDateOfMonth + 1) return onChange("date", 1);
            if (value === 0) return onChange("date", endDateOfMonth);
            onChange("date", value);
          }}
        />
      </div>
      <div className="flex items-center gap-8px">
        <span className="w-40px text-16px font-bold">시간 :</span>
        <NumberInputController
          value={hour}
          onChange={(_, value) => {
            if (value === -1) return onChange("hour", 23);
            if (value === 24) return onChange("hour", 0);
            onChange("hour", value);
          }}
        />
        <span className="text-14px font-medium text-gray-600">
          {hour > 12 ? `(오후) ${hour - 12}시` : `(오전) ${hour}시`}
        </span>
      </div>
      <div className="flex items-center gap-8px">
        <span className="w-40px text-16px font-bold">분 :</span>
        <NumberInputController
          value={minute}
          onChange={(_, value) => {
            if (value === -1) return onChange("minute", 59);
            if (value === 60) return onChange("minute", 0);
            onChange("minute", value);
          }}
        />
      </div>
    </div>
  );
}
