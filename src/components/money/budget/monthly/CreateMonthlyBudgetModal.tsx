import { MonthlyBudgetType } from "@/utils/types/money";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { getMonth } from "date-fns";
import React, { useState } from "react";

interface CreateMonthlyBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateMonthlyBudgetModal({
  isOpen,
  onClose,
}: Readonly<CreateMonthlyBudgetModalProps>) {
  const [value, setValue] = useState("300000");
  const [monthlyBudgetType, setMonthlyBudgetType] = useState<MonthlyBudgetType>(
    MonthlyBudgetType.SUM,
  );

  const formatBudget = (val: string) => `${val} 원`;
  const parseBudget = (val: string) => val.replace(/^\원/, "");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          한달예산 책정하기 ({getMonth(new Date()) + 1}월)
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-40px">
          <div className="flex flex-col gap-16px">
            <p className="text-18px font-medium">예산 측정 방법</p>
            <RadioGroup
              value={monthlyBudgetType}
              onChange={(type) =>
                setMonthlyBudgetType(type as MonthlyBudgetType)
              }
            >
              <Stack spacing={5} direction="row">
                <Radio value={MonthlyBudgetType.SUM}>카테고리 예산 합계</Radio>
                <Radio value={MonthlyBudgetType.SPECIFIED}>직접 설정</Radio>
              </Stack>
            </RadioGroup>
            {monthlyBudgetType === MonthlyBudgetType.SUM ? (
              <p className="whitespace-pre-wrap text-center font-medium text-gray-700">
                카테고리 예산 합게를 선택하면{"\n"}
                카테고리별로 설정한 예산의 합게를{"\n"}
                자동으로 설정해줍니다.
              </p>
            ) : (
              <NumberInput
                defaultValue={value}
                max={5_000_000}
                step={10_000}
                onChange={(valueString) => setValue(parseBudget(valueString))}
                value={formatBudget(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-8px">
            <button className="rounded-md px-12px py-10px text-14px font-medium duration-200 hover:bg-gray-100">
              취소
            </button>
            <button className="rounded-md bg-main px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main">
              수정
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
