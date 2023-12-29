import { ALL_EXPENDITURE } from "@/components/money/expenditure/ExpenditureListContainer";
import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { QueryKeys } from "@/utils/common/query-keys";
import { getMonthlyExpenditures } from "@/utils/services/money";
import { ExpenditureType } from "@/utils/types/money";
import { format, getDate } from "date-fns";
import React from "react";
import { useQuery } from "react-query";

interface ExpenditureListProps {
  expenditureType: string;
  year: number;
  month: number;
}
export default function ExpenditureList({
  expenditureType,
  year,
  month,
}: Readonly<ExpenditureListProps>) {
  const { data: dailyExpenditures = [] } = useQuery(
    QueryKeys.getMonthlyExpenditures(year, month, expenditureType),
    () =>
      getMonthlyExpenditures({
        year,
        month,
        category: expenditureType === ALL_EXPENDITURE ? "" : expenditureType,
      }),
    { onError: console.error },
  );

  return (
    <div>
      {dailyExpenditures.map((dailyExpenditure) => {
        return (
          <div key={`${dailyExpenditure.date}`}>
            <div className="flex-between border-b border-gray-200 py-6px">
              <div className="flex items-center gap-12px">
                <span className="text-24px font-bold text-red-500">
                  {getDate(new Date(dailyExpenditure.date))}
                </span>
                <div className="flex flex-col gap-4px text-12px">
                  <span>
                    {format(new Date(dailyExpenditure.date), "yyyy.MM")}
                  </span>
                  <span>
                    {getDayByAsiaSeoulFormat(dailyExpenditure.date)}요일
                  </span>
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
                <div
                  key={expenditure.id}
                  className="flex items-center gap-8px py-6px"
                >
                  <div className="w-72px text-12px font-medium text-gray-400">
                    {expenditure.budgetCategoryName}
                  </div>
                  <div className="flex grow flex-col gap-6px">
                    <p className="text-14px font-semibold">
                      {expenditure.content}
                    </p>
                    <p className="text-12px text-gray-400">
                      {format(new Date(expenditure.createdAt), "HH:mm")}
                    </p>
                  </div>
                  <div
                    className={`fotn-medium w-88px text-end text-14px ${
                      expenditure.type === ExpenditureType.INCOME
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {expenditure.price.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
