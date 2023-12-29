import SpaceY from "@/components/common/SpaceY";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
  return (
    <div>
      <div className="flex items-center gap-4px">
        <button
          onClick={() => onChangeDate("prev")}
          className="flex-center h-24px w-24px"
        >
          <FaChevronLeft />
        </button>
        <p className="text-20px font-bold">
          {year}년 {month}월
        </p>
        <button
          onClick={() => onChangeDate("next")}
          className="flex-center h-24px w-24px"
        >
          <FaChevronRight />
        </button>
      </div>

      <SpaceY height={24} />

      <div className="flex-between">
        <div className="flex flex-col gap-8px">
          <p className="flex items-center gap-6px">
            <span className="text-14px font-medium text-gray-500">수입</span>
            <span className="text-16px font-bold text-main">n,nnn,nnn원</span>
          </p>
          <p className="flex items-center gap-6px">
            <span className="text-14px font-medium text-gray-500">지출</span>
            <span className="text-16px font-bold text-red-500">nnn,nnn원</span>
          </p>
        </div>
        <button className="rounded-md bg-slate-100 px-8px py-12px text-14px font-semibold text-gray-700">
          지출 등록
        </button>
      </div>
    </div>
  );
}
