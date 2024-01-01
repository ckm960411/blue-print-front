import { ALL_EXPENDITURE } from "@/components/money/expenditure/ExpenditureListContainer";
import { QueryKeys } from "@/utils/common/query-keys";
import { getMonthlyExpenditures } from "@/utils/services/money";
import { getMonth, getYear } from "date-fns";
import { useQuery } from "react-query";

export const useMonthlyExpendituresQuery = (params?: {
  year?: number;
  month?: number;
  type?: string;
}) => {
  const year = params?.year ?? getYear(new Date());
  const month = params?.month ?? getMonth(new Date()) + 1;
  const expenditureType = params?.type ?? "";

  return useQuery(
    QueryKeys.getMonthlyExpenditures(year, month, expenditureType),
    () =>
      getMonthlyExpenditures({
        year,
        month,
        category: expenditureType === ALL_EXPENDITURE ? "" : expenditureType,
      }),
    { onError: console.error },
  );
};
