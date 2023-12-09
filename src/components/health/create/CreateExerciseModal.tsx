import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import CreateExerciseSelectType from "@/components/health/create/CreateExerciseSelectType";
import { ExerciseType } from "@/utils/types/health";

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExerciseModal({
  isOpen,
  onClose,
}: Readonly<CreateExerciseModalProps>) {
  const [type, setType] = useState<ExerciseType | null>(null);
  const [count, setCount] = useState(0);

  const UNDER_768PX = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Modal onClose={onClose} size={UNDER_768PX ? "full" : "lg"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>오늘 한 운동 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-16px">
          <div className="flex flex-col gap-16px">
            <p className="text-16px font-medium">어떤 운동을 했나요?</p>
            <div className="flex items-center gap-16px text-14px">
              <CreateExerciseSelectType
                type={type}
                onSelect={(type) => setType(type)}
              />
              {type && (
                <div className="flex grow items-center gap-8px">
                  <NumberInput
                    size="sm"
                    width={20}
                    value={count}
                    onChange={(_, value) => setCount(isNaN(value) ? 0 : value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <div className="grow">{type.unit}</div>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
