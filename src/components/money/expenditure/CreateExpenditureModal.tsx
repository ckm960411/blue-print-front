import SpaceY from "@/components/common/SpaceY";
import CreateBudgetCategoryDropdown from "@/components/money/budget/setting/CreateBudgetCategoryDropdown";
import CreateExpenditureContent from "@/components/money/expenditure/CreateExpenditureContent";
import CreateExpenditurePrice from "@/components/money/expenditure/CreateExpenditurePrice";
import CreateExpenditureTime from "@/components/money/expenditure/CreateExpenditureTime";
import CreateExpenditureTypeRadio from "@/components/money/expenditure/CreateExpenditureTypeRadio";
import ExpenditureMonthlyController from "@/components/money/expenditure/ExpenditureMonthlyController";
import { QueryKeys } from "@/utils/common/query-keys";
import { createExpenditure } from "@/utils/services/money";
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
import { useMutation, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();

  const now = new Date();
  const initialForm: ExpenditureForm = {
    type: ExpenditureType.SPENDING,
    year: getYear(now),
    month: getMonth(now) + 1,
    date: getDate(now),
    hour: getHours(now),
    minute: getMinutes(now),
    content: "",
    price: 10000,
  };

  const [category, setCategory] = useState<BudgetCategory | null>(null);
  const [expenditureForm, setExpenditureForm] =
    useState<ExpenditureForm>(initialForm);

  const { mutate: createExpenditureRequest } = useMutation(
    ["create-expenditure"],
    createExpenditure,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getMonthlyExpenditures());
        queryClient.invalidateQueries(QueryKeys.getMonthlySpending());
        handleClose();
      },
      onError: console.error,
    },
  );

  const handleChangeDate = (type: "prev" | "next") => {
    if (type === "prev") {
      setExpenditureForm((prev) => ({
        ...prev,
        year: expenditureForm.month === 1 ? prev.year - 1 : prev.year,
        month: expenditureForm.month === 1 ? 12 : prev.month - 1,
      }));
    } else {
      setExpenditureForm((prev) => ({
        ...prev,
        year: expenditureForm.month === 12 ? prev.year + 1 : prev.year,
        month: expenditureForm.month === 12 ? 1 : prev.month + 1,
      }));
    }
  };

  const handleClose = () => {
    setExpenditureForm(initialForm);
    onClose();
  };

  const handleConfirm = () => {
    createExpenditureRequest({
      ...expenditureForm,
      budgetCategoryId: category?.id,
    });
  };

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
            <CreateExpenditureContent
              content={expenditureForm.content}
              onChange={(value) =>
                setExpenditureForm((prev) => ({ ...prev, content: value }))
              }
            />
            <CreateExpenditurePrice
              price={expenditureForm.price}
              onChange={(value) =>
                setExpenditureForm((prev) => ({ ...prev, price: value }))
              }
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
