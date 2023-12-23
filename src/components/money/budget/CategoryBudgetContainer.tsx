import CategoryBudget from "@/components/money/budget/CategoryBudget";

export default function CategoryBudgetContainer() {
  return (
    <div className="flex flex-col gap-24px">
      <CategoryBudget />
      <CategoryBudget />
    </div>
  );
}
