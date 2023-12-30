import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ExpenditureMonthlyControllerProps {
  year: number;
  month: number;
  onChangeDate: (type: "prev" | "next") => void;
}
export default function ExpenditureMonthlyController({
  year,
  month,
  onChangeDate,
}: Readonly<ExpenditureMonthlyControllerProps>) {
  return (
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
  );
}
