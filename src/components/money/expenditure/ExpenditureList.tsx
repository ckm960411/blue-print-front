import DailyExpenditureCard from "@/components/money/expenditure/DailyExpenditureCard";
import { ALL_EXPENDITURE } from "@/components/money/expenditure/ExpenditureListContainer";
import { QueryKeys } from "@/utils/common/query-keys";
import { getMonthlyExpenditures } from "@/utils/services/money";
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
          <DailyExpenditureCard
            key={`${dailyExpenditure.date}`}
            dailyExpenditure={dailyExpenditure}
          />
        );
      })}
    </div>
  );
}
