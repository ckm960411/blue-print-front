import DailyExpenditureCard from "@/components/money/expenditure/DailyExpenditureCard";
import { useMonthlyExpendituresQuery } from "@/utils/hooks/react-query/money/useMonthlyExpendituresQuery";
import React from "react";

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
  const { data: dailyExpenditures = [] } = useMonthlyExpendituresQuery({
    year,
    month,
    type: expenditureType,
  });

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
