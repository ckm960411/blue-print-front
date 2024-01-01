import CreateBudgetCategoryDropdown from "@/components/money/budget/setting/CreateBudgetCategoryDropdown";
import CreateBudgetCategorySection from "@/components/money/budget/setting/CreateBudgetCategorySection";
import CreateCategoryBudgetSection from "@/components/money/budget/setting/CreateCategoryBudgetSection";
import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";
import { createMontlyBudgetCategory } from "@/utils/services/money";
import { BudgetCategory } from "@/utils/types/money";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface SettingCategoryBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateCategoryBudgetModal({
  isOpen,
  onClose,
}: Readonly<SettingCategoryBudgetModalProps>) {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();
  const { data: monthlyBudget } = useMonthlyBudgetQuery();

  const [currentCategory, setCurrentCategory] = useState<BudgetCategory | null>(
    null,
  );
  const [budget, setBudget] = useState<string>("300000");

  const resetState = () => {
    setCurrentCategory(null);
    setBudget("300000");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const { mutate: createMonthlyBudgetCategoryRequest } = useMutation(
    ["create-monthly-budget-category"],
    createMontlyBudgetCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          QueryKeys.getAllMonthlyBudgetCategoreis(),
        );
        handleClose();
      },
      onError: console.error,
    },
  );

  const handleConfirm = () => {
    if (!monthlyBudget || !currentCategory || !budget) {
      return openToast({
        status: "warning",
        title: "생성 오류",
        description: "필수 정보를 모두 입력해주세요.",
      });
    }
    createMonthlyBudgetCategoryRequest({
      monthlyBudgetId: monthlyBudget.id,
      budgetCategoryId: currentCategory.id,
      budget: +budget,
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
        <ModalHeader>카테고리별 예산 책정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-16px">
            <p className="text-18px font-bold">생성할 카테고리 선택</p>
            <div className="flex flex-col gap-8px">
              <CreateBudgetCategoryDropdown
                currentCategory={currentCategory}
                onSelect={(category) => setCurrentCategory(category)}
              />
              <CreateBudgetCategorySection
                onSuccess={(data) => setCurrentCategory(data)}
              />
              <CreateCategoryBudgetSection
                budget={budget}
                onChange={setBudget}
              />
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
