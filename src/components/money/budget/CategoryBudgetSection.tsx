import AddCategoryBudgetButton from "@/components/money/budget/AddCategoryBudgetButton";
import CategoryBudgetContainer from "@/components/money/budget/CategoryBudgetContainer";
import CategoryBudgetHeader from "@/components/money/budget/CategoryBudgetHeader";
import CreateCategoryBudgetModal from "@/components/money/budget/setting/CreateCategoryBudgetModal";
import { useDisclosure } from "@chakra-ui/hooks";

export default function CategoryBudgetSection() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col gap-32px">
      <CategoryBudgetHeader />
      <CategoryBudgetContainer />
      <AddCategoryBudgetButton onClick={onOpen} />

      <CreateCategoryBudgetModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
