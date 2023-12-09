import { Colors } from "@/utils/common/color";
import { useAllExerciseTypeQuery } from "@/utils/hooks/react-query/health/useAllExerciseTypeQuery";
import { ExerciseType } from "@/utils/types/health";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

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
  const exerciseTypes = useAllExerciseTypeQuery();

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
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IoChevronDownSharp />}
                  borderRadius="md"
                  borderWidth="1px"
                  _expanded={{ bg: "#fff" }}
                  className="truncate-1-lines w-144px px-8px py-4px text-left text-14px"
                  style={{ display: "flex" }}
                >
                  {type?.name ?? "선택"}
                </MenuButton>
                <MenuList>
                  {exerciseTypes.map((type) => (
                    <MenuItem
                      key={type.id}
                      onClick={() => setType(type)}
                      className="py-4px text-left text-14px"
                      _hover={{ bg: Colors.gray[50] }}
                    >
                      {type.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
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
