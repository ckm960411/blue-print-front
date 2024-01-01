import CategorySettingButton from "@/components/money/budget/CategorySettingButton";

export default function CategoryBudgetHeader() {
  return (
    <div className="flex-between">
      <p className="text-16px font-bold">카테고리별 예산</p>
      <CategorySettingButton />
    </div>
  );
}
