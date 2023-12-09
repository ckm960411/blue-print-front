import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ExerciseType } from "@/utils/types/health";

interface CreateExerciseCountProps {
  type: ExerciseType | null;
  count: number;
  onChangeCount: (count: number) => void;
}
export default function CreateExerciseCount({
  type,
  count,
  onChangeCount,
}: Readonly<CreateExerciseCountProps>) {
  if (!type) return <></>;

  return (
    <div className="flex grow items-center gap-8px">
      <NumberInput
        size="sm"
        width={20}
        min={0}
        value={count}
        onChange={(_, value) => onChangeCount(value)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <div className="grow">{type.unit}</div>
    </div>
  );
}
