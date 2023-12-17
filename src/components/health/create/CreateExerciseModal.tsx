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
  const [description, setDescription] = useState("");

  const UNDER_768PX = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Modal onClose={onClose} size={UNDER_768PX ? "full" : "lg"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>오늘 한 운동 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-16px p-16px">
          <div className="flex grow flex-col gap-16px">
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
            <CreateExerciseDescription
              description={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-16px">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-200 px-12px py-8px text-16px font-medium duration-200 hover:bg-gray-100"
            >
              닫기
            </button>
            <button className="rounded-md border border-gray-200 bg-main px-12px py-8px text-16px font-medium text-white duration-200">
              작성하기
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
