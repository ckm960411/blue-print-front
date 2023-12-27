import CategoryBudget from "@/components/money/budget/CategoryBudget";
import { useMonthlyBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetCategoriesQuery";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";

export default function CategoryBudgetContainer() {
  const { data: monthlyBudget } = useMonthlyBudgetQuery();

  const monthlyBudgetCategories = useMonthlyBudgetCategoriesQuery(
    monthlyBudget?.id,
  );

  if (monthlyBudgetCategories.length === 0) {
    return <div>no monthlyBudgetCategories</div>;
  }

  return (
    <div className="flex flex-col gap-24px">
      {monthlyBudgetCategories.map((category) => (
        <CategoryBudget key={category.id} monthlyBudgetCategory={category} />
      ))}
    </div>
  );
}
