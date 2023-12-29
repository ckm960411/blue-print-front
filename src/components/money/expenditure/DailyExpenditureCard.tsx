import ExpenditureCard from "@/components/money/expenditure/ExpenditureCard";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { DailyExpenditure } from "@/utils/types/money";
import { format, getDate, getDay } from "date-fns";
import React from "react";

interface DailyExpenditureCardProps {
  dailyExpenditure: DailyExpenditure;
}
export default function DailyExpenditureCard({
  dailyExpenditure,
}: Readonly<DailyExpenditureCardProps>) {
  return (
    <div>
      <div className="flex-between border-b border-gray-200 py-6px">
        <div className="flex items-center gap-12px">
          <span
            className={`text-24px font-bold ${
              getDay(new Date(dailyExpenditure.date)) === 0
                ? "text-red-500"
                : "text-main"
            }`}
          >
            {getDate(new Date(dailyExpenditure.date))}
          </span>
          <div className="flex flex-col gap-4px text-12px">
            <span>{format(new Date(dailyExpenditure.date), "yyyy.MM")}</span>
            <span>{getDayByAsiaSeoulFormat(dailyExpenditure.date)}요일</span>
          </div>
        </div>
        <div className="flex-center gap-8px text-14px font-medium">
          <span className="text-blue-500">
            {dailyExpenditure.income.toLocaleString()}원
          </span>
          <span className="w-80px text-end text-red-500">
            {dailyExpenditure.spending.toLocaleString()}원
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        {dailyExpenditure.data.map((expenditure) => (
          <ExpenditureCard key={expenditure.id} expenditure={expenditure} />
        ))}
      </div>
    </div>
  );
}
