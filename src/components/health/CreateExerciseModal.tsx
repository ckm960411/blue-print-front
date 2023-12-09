import { useAllExerciseTypeQuery } from "@/utils/hooks/react-query/health/useAllExerciseTypeQuery";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useMediaQuery } from "react-responsive";

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExerciseModal({
  isOpen,
  onClose,
}: Readonly<CreateExerciseModalProps>) {
  const UNDER_768PX = useMediaQuery({ query: "(max-width: 767px)" });
  const exerciseTypes = useAllExerciseTypeQuery();

  return (
    <Modal onClose={onClose} size={UNDER_768PX ? "full" : "lg"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>오늘 한 운동 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-16px">
          <div>
            <p className="text-16px font-medium">어떤 운동을 했습니까?</p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
