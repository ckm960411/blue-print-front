import SpaceY from "@/components/common/SpaceY";
import CreateExpenditureModal from "@/components/money/expenditure/CreateExpenditureModal";
import ExpenditureMonthlyController from "@/components/money/expenditure/ExpenditureMonthlyController";
import { useTotalMonthlyExpenditures } from "@/utils/hooks/react-query/money/useTotalMonthlyExpenditures";
import { useDisclosure } from "@chakra-ui/hooks";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { income, spending } = useTotalMonthlyExpenditures(year, month);

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
              {income.toLocaleString()}원
            </span>
          </p>
          <p className="flex items-center gap-6px">
            <span className="text-14px font-medium text-gray-500">지출</span>
            <span className="text-16px font-bold text-red-500">
              {spending.toLocaleString()}원
            </span>
          </p>
        </div>
        <button
          onClick={onOpen}
          className="rounded-md bg-slate-100 px-8px py-12px text-14px font-semibold text-gray-700"
        >
          지출 등록
        </button>
      </div>

      <CreateExpenditureModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
