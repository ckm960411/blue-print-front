import AddCategoryBudgetButton from "@/components/money/budget/AddCategoryBudgetButton";
import CategoryBudgetContainer from "@/components/money/budget/CategoryBudgetContainer";
import CategoryBudgetHeader from "@/components/money/budget/CategoryBudgetHeader";

export default function CategoryBudgetSection() {
  return (
    <div className="flex flex-col gap-32px">
      <CategoryBudgetHeader />
      <CategoryBudgetContainer />
      <AddCategoryBudgetButton />
    </div>
  );
}
