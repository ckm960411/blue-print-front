import SpaceY from "@/components/common/SpaceY";
import NumberInputController from "@/components/components/NumberInputController";
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

interface ExpenditureForm {
  type: ExpenditureType;
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  content: string;
  price: number;
}

interface CreateExpenditureModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExpenditureModal({
  isOpen,
  onClose,
}: Readonly<CreateExpenditureModalProps>) {
  const now = new Date();
  const [expenditureForm, setExpenditureForm] = useState<ExpenditureForm>({
    type: ExpenditureType.SPENDING,
    year: getYear(now),
    month: getMonth(now) + 1,
    date: getDate(now),
    hour: getHours(now),
    minute: getMinutes(now),
    content: "",
    price: 10000,
  });
  const [category, setCategory] = useState<BudgetCategory | null>(null);

  const handleChangeDate = (type: "prev" | "next") => {
    if (type === "prev") {
      if (expenditureForm.month !== 1)
        return setExpenditureForm((prev) => ({
          ...prev,
          month: prev.month - 1,
        }));
      setExpenditureForm((prev) => ({
        ...prev,
        year: prev.year - 1,
        month: 12,
      }));
    } else {
      if (expenditureForm.month !== 12)
        return setExpenditureForm((prev) => ({
          ...prev,
          month: prev.month + 1,
        }));
      setExpenditureForm((prev) => ({
        ...prev,
        year: prev.year + 1,
        month: 1,
      }));
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
            year={expenditureForm.year}
            month={expenditureForm.month}
            onChangeDate={handleChangeDate}
          />
          <SpaceY height={24} />
          <CreateExpenditureTime
            year={expenditureForm.year}
            month={expenditureForm.month}
            date={expenditureForm.date}
            hour={expenditureForm.hour}
            minute={expenditureForm.minute}
            onChange={(type, value) => {
              setExpenditureForm((prev) => ({
                ...prev,
                date: type === "date" ? value : prev.date,
                hour: type === "hour" ? value : prev.hour,
                minute: type === "minute" ? value : prev.minute,
              }));
            }}
          />
          <hr className="my-16px" />
          <div className="flex flex-col gap-16px">
            <CreateExpenditureTypeRadio
              type={expenditureForm.type}
              onChange={(type) =>
                setExpenditureForm((prev) => ({ ...prev, type }))
              }
            />
            {expenditureForm.type === ExpenditureType.SPENDING && (
              <CreateBudgetCategoryDropdown
                currentCategory={category}
                onSelect={setCategory}
                hasNoneOption
              />
            )}
            <div className="flex items-center gap-8px">
              <span className="w-40px text-16px font-bold">설명 : </span>
              <input
                value={expenditureForm.content}
                onChange={(e) =>
                  setExpenditureForm((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="ex) 슈퍼스타어반"
                className="rounded-md border border-gray-200 px-6px py-6px text-16px"
              />
            </div>
            <div className="flex items-center gap-8px">
              <span className="w-40px text-16px font-bold">금액 : </span>
              <NumberInputController
                value={expenditureForm.price}
                onChange={(_, value) =>
                  setExpenditureForm((prev) => ({ ...prev, price: value || 0 }))
                }
                width={32}
              />
              <span>원</span>
            </div>
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
