import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface CreateCategoryBudgetSectionProps {
  budget: string;
  onChange: (value: string) => void;
}
export default function CreateCategoryBudgetSection({
  budget,
  onChange,
}: Readonly<CreateCategoryBudgetSectionProps>) {
  const formatBudget = (val: string) => `${val} 원`;
  const parseBudget = (val: string) => val.replace(/원/, "");

  return (
    <NumberInput
      defaultValue={budget}
      max={5_000_000}
      step={10_000}
      onChange={(valueString) => onChange(parseBudget(valueString))}
      value={formatBudget(budget)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
