import CreateExerciseDescription from "@/components/health/create/CreateExerciseDescription";
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

import { ExerciseType } from "@/utils/types/health";
import CreateExerciseSelectType from "@/components/health/create/CreateExerciseSelectType";
import CreateExerciseCount from "@/components/health/create/CreateExerciseCount";
import CreateExerciseType from "@/components/health/create/CreateExerciseType";

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExerciseModal({
  isOpen,
  onClose,
}: Readonly<CreateExerciseModalProps>) {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
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
                exerciseType={exerciseType}
                onSelect={(type) => setExerciseType(type)}
              />
              <CreateExerciseCount
                exerciseType={exerciseType}
                count={count}
                onChangeCount={(value) => setCount(isNaN(value) ? 0 : value)}
              />
            </div>
            <CreateExerciseType onSuccess={(type) => setExerciseType(type)} />
            <CreateExerciseDescription />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
