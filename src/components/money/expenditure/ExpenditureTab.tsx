import ExpenditureList from "@/components/money/expenditure/ExpenditureList";
import ExpenditureMonthlyHeader from "@/components/money/expenditure/ExpenditureMonthlyHeader";

export default function ExpenditureTab() {
  return (
    <div>
      <ExpenditureMonthlyHeader />
      <hr className="my-24px" />
      <ExpenditureList />
    </div>
  );
}
