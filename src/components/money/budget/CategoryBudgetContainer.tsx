import CategoryBudget from "@/components/money/budget/CategoryBudget";
import { useMonthlyBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetCategoriesQuery";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";

export default function CategoryBudgetContainer() {
  const { data: monthlyBudget } = useMonthlyBudgetQuery();

  const monthlyBudgetCategories = useMonthlyBudgetCategoriesQuery(
    monthlyBudget?.id,
  );

  if (monthlyBudgetCategories.length === 0) {
    return (
      <div className="flex-center flex-col gap-16px px-16px pt-40px text-center">
        <p className="text-50px">💸</p>
        <p className="text-18px font-bold leading-[140%]">
          예산을 아직 책정하지 않았어요!
        </p>
        <p className="whitespace-pre-wrap text-center font-medium text-gray-700">
          돈이 줄줄 새기 전에 현명한 소비를 위해{"\n"}예산을 측정해봅시다!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-24px">
      {monthlyBudgetCategories.map((category) => (
        <CategoryBudget key={category.id} monthlyBudgetCategory={category} />
      ))}
    </div>
  );
}
