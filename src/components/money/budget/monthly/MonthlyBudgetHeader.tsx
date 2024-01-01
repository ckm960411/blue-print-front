import SettingMonthlyBudgetModal from "@/components/money/budget/monthly/SettingMonthlyBudgetModal";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";
import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";
import { useDisclosure } from "@chakra-ui/hooks";

interface MonthlyBudgetHeaderProps {
  monthlyBudgetPolicy: MonthlyBudgetPolicy;
}
export default function MonthlyBudgetHeader({
  monthlyBudgetPolicy,
}: Readonly<MonthlyBudgetHeaderProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: monthlyBudget } = useMonthlyBudgetQuery();

  if (!monthlyBudget) return <></>;

  return (
    <div className="flex-between">
      <p className="text-16px font-bold">
        한달 예산{" "}
        <span className="text-14px font-medium text-gray-600">
          ({monthlyBudgetPolicy.startDate} ~ {monthlyBudgetPolicy.endDate})
        </span>
      </p>
      <button onClick={onOpen} className="p-2px text-14px font-bold text-main">
        예산 설정
      </button>

      <SettingMonthlyBudgetModal
        type="update"
        isOpen={isOpen}
        onClose={onClose}
        monthlyBudget={monthlyBudget}
      />
    </div>
  );
}
