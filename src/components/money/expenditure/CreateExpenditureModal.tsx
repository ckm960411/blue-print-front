import SpaceY from "@/components/common/SpaceY";
import CreateBudgetCategoryDropdown from "@/components/money/budget/setting/CreateBudgetCategoryDropdown";
import CreateExpenditureTime from "@/components/money/expenditure/CreateExpenditureTime";
import CreateExpenditureTypeRadio from "@/components/money/expenditure/CreateExpenditureTypeRadio";
import ExpenditureMonthlyController from "@/components/money/expenditure/ExpenditureMonthlyController";
import { BudgetCategory, ExpenditureType } from "@/utils/types/money";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { getDate, getHours, getMinutes, getMonth, getYear } from "date-fns";
import React, { useState } from "react";

interface CreateExpenditureModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExpenditureModal({
  isOpen,
  onClose,
}: Readonly<CreateExpenditureModalProps>) {
  const now = new Date();
  const [year, setYear] = useState(getYear(now));
  const [month, setMonth] = useState(getMonth(now) + 1);
  const [date, setDate] = useState(getDate(now));
  const [hour, setHour] = useState(getHours(now));
  const [minute, setMinute] = useState(getMinutes(now));
  const [type, setType] = useState<ExpenditureType>(ExpenditureType.SPENDING);
  const [category, setCategory] = useState<BudgetCategory | null>(null);

  const handleChangeDate = (type: "prev" | "next") => {
    if (type === "prev") {
      if (month !== 1) return setMonth((prev) => prev - 1);
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      if (month !== 12) return setMonth((prev) => prev + 1);
      setYear((prev) => prev + 1);
      setMonth(1);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="full"
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이번 달 수입/지출</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ExpenditureMonthlyController
            year={year}
            month={month}
            onChangeDate={handleChangeDate}
          />
          <SpaceY height={24} />
          <CreateExpenditureTime
            year={year}
            month={month}
            date={date}
            hour={hour}
            minute={minute}
            onChange={(type, value) => {
              if (type === "date") return setDate(value);
              if (type === "hour") return setHour(value);
              if (type === "minute") return setMinute(value);
            }}
          />
          <hr className="my-16px" />
          <div className="flex flex-col gap-16px">
            <CreateExpenditureTypeRadio type={type} onChange={setType} />
            <CreateBudgetCategoryDropdown
              currentCategory={category}
              onSelect={setCategory}
              hasNoneOption
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-8px">
            <button
              onClick={handleClose}
              className="rounded-md px-12px py-10px text-14px font-medium duration-200 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md bg-main px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main"
            >
              확인
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
