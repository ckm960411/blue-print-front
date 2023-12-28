import ExpenditureListContainer from "@/components/money/expenditure/ExpenditureListContainer";
import ExpenditureMonthlyHeader from "@/components/money/expenditure/ExpenditureMonthlyHeader";

export default function ExpenditureTab() {
  return (
    <div>
      <ExpenditureMonthlyHeader />
      <hr className="my-24px" />
      <ExpenditureListContainer />
    </div>
  );
}
