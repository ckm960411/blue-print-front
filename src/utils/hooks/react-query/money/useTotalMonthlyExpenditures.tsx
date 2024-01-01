import { QueryKeys } from "@/utils/common/query-keys";
import { getTotalMonthlyExpenditure } from "@/utils/services/money";
import { useQuery } from "react-query";

export const useTotalMonthlyExpenditures = (year: number, month: number) => {
  const { data: expenditureData } = useQuery(
    QueryKeys.getTotalMonthlyExpenditure(year, month),
    () => getTotalMonthlyExpenditure({ year, month }),
    { onError: console.error },
  );

  if (!expenditureData) {
    return { income: 0, spending: 0 };
  }
  return expenditureData;
};
