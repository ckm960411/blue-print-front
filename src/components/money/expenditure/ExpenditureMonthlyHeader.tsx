import SpaceY from "@/components/common/SpaceY";
import ExpenditureMonthlyController from "@/components/money/expenditure/ExpenditureMonthlyController";
import { QueryKeys } from "@/utils/common/query-keys";
import { getTotalMonthlyExpenditure } from "@/utils/services/money";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useQuery } from "react-query";

interface ExpenditureMonthlyHeaderProps {
  year: number;
  month: number;
  onChangeDate: (type: "prev" | "next") => void;
}
export default function ExpenditureMonthlyHeader({
  year,
  month,
  onChangeDate,
}: Readonly<ExpenditureMonthlyHeaderProps>) {
  const { data: expenditureData } = useQuery(
    QueryKeys.getTotalMonthlyExpenditure(year, month),
    () => getTotalMonthlyExpenditure({ year, month }),
    { onError: console.error },
  );

  if (!expenditureData) return <></>;

  return (
    <div>
      <ExpenditureMonthlyController
        year={year}
        month={month}
        onChangeDate={onChangeDate}
      />

      <SpaceY height={24} />

      <div className="flex-between">
        <div className="flex flex-col gap-8px">
          <p className="flex items-center gap-6px">
            <span className="text-14px font-medium text-gray-500">수입</span>
            <span className="text-16px font-bold text-main">
              {expenditureData.income.toLocaleString()}원
            </span>
          </p>
          <p className="flex items-center gap-6px">
            <span className="text-14px font-medium text-gray-500">지출</span>
            <span className="text-16px font-bold text-red-500">
              {expenditureData.spending.toLocaleString()}원
            </span>
          </p>
        </div>
        <button className="rounded-md bg-slate-100 px-8px py-12px text-14px font-semibold text-gray-700">
          지출 등록
        </button>
      </div>

      <CreateExpenditureModal
        year={year}
        month={month}
        isOpen={true}
        onClose={() => {}}
      />
    </div>
  );
}
