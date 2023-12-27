import { QueryKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { getAllBudgetCategories } from "@/utils/services/money";
import { useQuery } from "react-query";

export const useBudgetCategoriesQuery = () => {
  const me = useMe();

  const { data: categories = [] } = useQuery(
    QueryKeys.getAllBudgetCategories([me?.id]),
    getAllBudgetCategories,
    { staleTime: 60 * 60 * 1000, onError: console.error },
  );

  return categories;
};
